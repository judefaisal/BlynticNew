import React, { useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import { Calendar } from 'lucide-react';

const TalkToSales: React.FC = () => {
  useEffect(() => {
    (function (C: any, A: string, L: string) { 
      let p = function (a: any, ar: any) { a.q.push(ar); }; 
      let d = C.document; 
      C.Cal = C.Cal || function () { 
        let cal = C.Cal; 
        let ar = arguments; 
        if (!cal.loaded) { 
          cal.ns = {}; 
          cal.q = cal.q || []; 
          let script = d.createElement("script");
          script.src = A;
          d.head.appendChild(script); 
          cal.loaded = true; 
        } 
        if (ar[0] === L) { 
          const api = function () { p(api, arguments); }; 
          const namespace = ar[1]; 
          api.q = api.q || []; 
          if(typeof namespace === "string"){
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar); 
          return;
        } 
        p(cal, ar); 
      }; 
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = (window as any).Cal;
    if (Cal) {
      Cal("init", "30min", {origin:"https://app.cal.com"});
      Cal.ns["30min"]("inline", {
        elementOrSelector: "#my-cal-inline",
        calLink: "jude.al-attraqchi/30min",
        layout: "month_view"
      });
      Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    }
  }, []);

  return (
    <section className="bg-white pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-6">
                Talk to <span className="text-blue-600">Sales</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg text-gray-600 mb-8">
                Book a time with our team to discuss how BLYNTIC can help automate your workflow.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} width="100%">
            <div 
              style={{ width: "100%", minHeight: "750px", overflow: "visible" }} 
              id="my-cal-inline"
            ></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TalkToSales;
