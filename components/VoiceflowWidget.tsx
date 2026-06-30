import React, { useEffect } from 'react';

const VoiceflowWidget: React.FC = () => {
  useEffect(() => {
    // Load the script only once
    if (!document.getElementById('voiceflow-script')) {
      const script = document.createElement('script');
      script.id = 'voiceflow-script';
      script.type = 'text/javascript';
      script.onload = () => {
        if ((window as any).voiceflow?.chat) {
          (window as any).voiceflow.chat.load({
            verify: { projectID: '6a430c5039c65a537385f4bd' },
            url: 'https://general-runtime.voiceflow.com',
            voice: {
              url: "https://runtime-api.voiceflow.com"
            }
          });
        }
      };
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      document.body.appendChild(script);
    } else {
      // If already loaded, just show it
      if ((window as any).voiceflow?.chat) {
        try {
          (window as any).voiceflow.chat.show();
        } catch (e) {
          console.error(e);
        }
      }
    }

    return () => {
      // Hide when component unmounts
      if ((window as any).voiceflow?.chat) {
        try {
          (window as any).voiceflow.chat.hide();
        } catch (e) {
          console.error(e);
        }
      }
    };
  }, []);

  return null;
};

export default VoiceflowWidget;
