import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Settings, User as UserIcon } from 'lucide-react';
import { ai } from '../services/gemini';
import { Type } from '@google/genai';
import { initAuth, googleSignIn } from '../src/firebase';

const CHAT_STORAGE_KEY = 'blyntic_chatbot_history';
const SHEET_ID_KEY = 'blyntic_spreadsheet_id';

const saveLeadFunction = {
  name: "saveLead",
  description: "Save a collected business lead to the database. Call this AFTER you have collected the person's first name, business name, phone number, and email. Provide a brief summary of their needs.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      firstName: { type: Type.STRING },
      businessName: { type: Type.STRING },
      phoneNumber: { type: Type.STRING },
      email: { type: Type.STRING },
      summary: { type: Type.STRING }
    },
    required: ["firstName", "businessName", "phoneNumber", "email", "summary"]
  }
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const spreadsheetId = import.meta.env.VITE_SPREADSHEET_ID;
  const [token, setToken] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initAuth((user, t) => setToken(t), () => setToken(null));
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {}
    } else {
      setMessages([{ role: 'model', text: "Hey, how can I help you?" }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleLogin = async () => {
    try {
      const result = await googleSignIn();
      if (result) setToken(result.accessToken);
    } catch (e) {
      console.error(e);
      alert('Login failed');
    }
  };

  const extractSheetId = (input: string) => {
    const match = input.match(/\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : input.trim();
  };

  const saveToSheet = async (lead: any) => {
    if (!token) {
      console.warn('Cannot save to sheet without token');
      return { success: false, error: "Admin is not signed in. Please click the settings gear and sign in with Google." };
    }
    if (!spreadsheetId) {
      console.warn('Cannot save: Spreadsheet ID is missing');
      return { success: false, error: "Spreadsheet ID is missing in the settings." };
    }

    const actualId = extractSheetId(spreadsheetId);

    try {
      // Get the name of the first sheet
      let sheetName = 'Sheet1';
      const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${actualId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (metaRes.ok) {
        const meta = await metaRes.json();
        if (meta.sheets && meta.sheets.length > 0) {
          sheetName = meta.sheets[0].properties.title;
        }
      } else {
        const err = await metaRes.text();
        console.warn('Failed to fetch spreadsheet metadata:', err);
        return { success: false, error: `Spreadsheet access error: ${err}` };
      }

      const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${actualId}/values/${encodeURIComponent(sheetName)}!A1:append?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [[new Date().toISOString(), lead.firstName, lead.businessName, lead.phoneNumber, lead.email, lead.summary]]
        })
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Spreadsheet save error:', errorText);
        return { success: false, error: `Error appending to sheet: ${errorText}` };
      }
      return { success: true };
    } catch (e: any) {
      console.error('Exception in saveToSheet:', e);
      return { success: false, error: e.message };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Reconstruct chat history for Gemini
      const contents = newMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contents,
        config: {
          systemInstruction: `You are Amy, an AI automation solutions expert working for Blyntic. Your job is to act as a chatbot for website visitors.
If the user replies to your initial greeting with "Yeah, I'm good" or similar, ask if they are the person whose persona is Amy.
Blyntic is your premier partner for AI-driven transformation, deploying custom AI voice receptionists to handle calls and bookings 24/7, alongside intelligent chatbots for instant internal knowledge access, efficient HR task automation, WhatsAPP Agent, social media AI reply and seamless customer inquiry resolution. Our comprehensive AI marketing solutions and website integration services ensure automated, scalable digital engagement that eliminates repetitive tasks, optimises your workflow, and provides exceptional, personalised client experiences around the clock.

If the user asks "What do you do?", provide a very short product pitch based on the Blyntic knowledge above and ask what type of business they have.
Your primary goal is to collect their business name, first name, phone number, and email.
You MUST collect all 4 pieces of information in a natural, conversational way.
Once you have collected the first name, business name, phone number, and email, you MUST output a function call to saveLead using the data you collected.
Do not make up any information.
Keep your responses very concise, professional and friendly.`,
          tools: [{ functionDeclarations: [saveLeadFunction] }],
        }
      });

      const fnCall = response.functionCalls?.[0];
      if (fnCall && fnCall.name === 'saveLead') {
        const args = fnCall.args as any;
        const result = await saveToSheet(args);
        if (result.success) {
          setMessages(prev => [...prev, { role: 'model', text: "Thank you! I have saved your details securely. Our team will be in touch shortly to assist with your AI automation." }]);
        } else {
          setMessages(prev => [...prev, { role: 'model', text: `I collected your details, but there was an error saving them to the database. \n\nError details:\n${result.error}` }]);
        }
      } else if (response.text) {
        setMessages(prev => [...prev, { role: 'model', text: response.text }]);
      }
    } catch (e: any) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'model', text: `Sorry, I encountered an error: ${e.message}` }]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-40 ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-100">
          <div className="bg-blue-600 text-white p-4 py-3 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                {!imageError ? (
                  <img src="/amy.png" alt="Amy" className="w-full h-full object-cover" onError={() => setImageError(true)} />
                ) : (
                  <UserIcon size={18} />
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Amy</h3>
                <p className="text-xs text-blue-100">AI Automation Expert</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 text-gray-400 rounded-2xl rounded-bl-sm shadow-sm px-4 py-2.5 text-sm flex gap-1 items-center h-10 w-16">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-white flex gap-2 shrink-0">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Reply to Amy..."
              className="flex-1 bg-gray-100 rounded-full px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-shadow"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center disabled:opacity-50 transition-opacity flex-shrink-0 hover:bg-blue-700"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
