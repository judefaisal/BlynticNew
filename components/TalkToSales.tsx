import React, { useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import { trackMetaSchedule } from '../utils/metaPixel';

const TalkToSales: React.FC = () => {
  useEffect(() => {
    // Cal.com embed loader with 12h forced configuration
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
      Cal("init", "jude-blynticai", { origin: "https://app.cal.com" });
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;
      Cal.config.timeFormat = 12;

      // Initialize UI for namespace with 12h time format locked
      if (Cal.ns && Cal.ns["jude-blynticai"]) {
        Cal.ns["jude-blynticai"]("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
          timeFormat: 12
        });

        // Mount inline calendar only if not already mounted
        const container = document.getElementById("my-cal-inline");
        if (container && !container.querySelector("iframe") && container.children.length === 0) {
          Cal.ns["jude-blynticai"]("inline", {
            elementOrSelector: "#my-cal-inline",
            calLink: "jude.al-attraqchi/jude-blynticai?timeFormat=12",
            layout: "month_view",
            config: {
              timeFormat: 12
            }
          });
        }

        // Track Meta Schedule event when appointment booking is completed
        Cal.ns["jude-blynticai"]("on", {
          action: "bookingSuccessful",
          callback: () => {
            trackMetaSchedule({
              content_name: '30min Consultation Booking',
              currency: 'NZD'
            });
          }
        });
      }
    }

    return () => {
      const container = document.getElementById("my-cal-inline");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="bg-white pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-4">
                Talk to <span className="text-blue-600">Sales</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Book a time with our team to discuss how BLYNTIC can help automate your workflow, customer messaging, and custom app solutions.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} width="100%">
            <div className="bg-white rounded-3xl p-2 sm:p-6 border border-gray-100 shadow-xl overflow-hidden min-h-[750px]">
              {/* Cal.com inline calendar element */}
              <div 
                id="my-cal-inline"
                data-cal-link="jude.al-attraqchi/jude-blynticai?timeFormat=12"
                data-cal-namespace="jude-blynticai"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","timeFormat":12}'
                style={{ width: "100%", minHeight: "720px", overflow: "visible" }} 
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TalkToSales;
