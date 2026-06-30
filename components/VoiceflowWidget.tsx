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

          // Inject custom CSS to make the launcher icon 25% larger
          const checkShadowRoot = setInterval(() => {
            const vfc = document.querySelector('voiceflow-chat');
            if (vfc && vfc.shadowRoot) {
              const style = document.createElement('style');
              style.innerHTML = `
                .vfrc-launcher {
                  transform: scale(1.25) !important;
                  transform-origin: center !important;
                }
              `;
              vfc.shadowRoot.appendChild(style);
              clearInterval(checkShadowRoot);
            }
          }, 500);
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
