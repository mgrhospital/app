(function () {
      /* ===== THEME TOGGLE ===== */
      var THEME_KEY = 'mgr-theme';
      function getTheme() { return localStorage.getItem(THEME_KEY) || 'light'; }
      function applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem(THEME_KEY, t);
      }
      applyTheme(getTheme());

      var themeToggle = document.getElementById('themeToggle');
      var themeToggleSm = document.getElementById('themeToggleSm');
      function toggleTheme() {
        var cur = document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(cur === 'dark' ? 'light' : 'dark');
      }
      if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
      if (themeToggleSm) themeToggleSm.addEventListener('click', toggleTheme);

      /* ===== LANGUAGE SWITCHER ===== */
      var LANG_KEY = 'mgr-lang';
      var currentLang = localStorage.getItem(LANG_KEY) || 'en';

      /* Translation map: CSS selector → {en, te, hi} */
      var i18n = [
        // Nav
        { s: '[data-i18n="nav.about"]', en: 'About', te: 'గురించి', hi: 'परिचय' },
        { s: '[data-i18n="nav.specs"]', en: 'Specializations', te: 'ప్రత్యేకతలు', hi: 'विशेषज्ञताएँ' },
        { s: '[data-i18n="nav.approach"]', en: 'Our Approach', te: 'మా విధానం', hi: 'हमारा दृष्टिकोण' },
        { s: '[data-i18n="nav.gallery"]', en: 'Gallery', te: 'గ్యాలరీ', hi: 'गैलरी' },
        { s: '[data-i18n="nav.visit"]', en: 'Visit', te: 'సందర్శించండి', hi: 'संपर्क' },
        { s: '[data-i18n="nav.appointment"]', en: 'Appointment', te: 'అపాయింట్‌మెంట్', hi: 'अपॉइंटमेंट' },
        { s: '[data-i18n="nav.followus"]', en: 'Follow us', te: 'మమ్మల్ని అనుసరించండి', hi: 'हमें फॉलो करें' },
        { s: '[data-i18n="nav.theme"]', en: 'Theme', te: 'థీమ్', hi: 'थीम' },
        { s: '[data-i18n="nav.language"]', en: 'Language', te: 'భాష', hi: 'भाषा' },
        { s: '[data-i18n="nav.faq"]', en: 'FAQ', te: 'ప్రశ్నలు', hi: 'सवाल' },

        // Share / Rate actions
        { s: '[data-i18n="act.group"]', en: 'Share & rate', te: 'షేర్ & రేటింగ్', hi: 'शेयर और रेटिंग' },
        { s: '[data-i18n="act.share"]', en: 'Share', te: 'షేర్', hi: 'शेयर' },
        { s: '[data-i18n="act.rate"]', en: 'Rate us', te: 'రేటింగ్ ఇవ్వండి', hi: 'रेटिंग दें' },

        // FAQ section
        { s: '[data-i18n="faq.eyebrow"]', en: 'Questions & answers', te: 'ప్రశ్నలు & సమాధానాలు', hi: 'सवाल और जवाब' },
        { s: '[data-i18n="faq.h2"]', en: 'Frequently asked questions', te: 'తరచుగా అడిగే ప్రశ్నలు', hi: 'अक्सर पूछे जाने वाले सवाल' },
        { s: '[data-i18n="faq.intro"]', en: 'Common questions about surgery, timings and appointments at MGR Hospital, Visakhapatnam (Vizag).', te: 'MGR హాస్పిటల్, విశాఖపట్నం (వైజాగ్)లో సర్జరీ, సమయాలు మరియు అపాయింట్‌మెంట్ల గురించి సాధారణ ప్రశ్నలు.', hi: 'MGR अस्पताल, विशाखापट्नम (वाइज़ाग) में सर्जरी, समय और अपॉइंटमेंट से जुड़े आम सवाल।' },

        // Hero
        { s: '.ribbon', en: '★ 3× Best Surgeon · Vizag', te: '★ 3× ఉత్తమ సర్జన్ · విశాఖ', hi: '★ 3× सर्वश्रेष्ठ सर्जन · विशाखा' },
        { s: '.doc-hero-creds li:nth-child(1)', en: 'Former Head of General Surgery, King George Hospital', te: 'కింగ్ జార్జ్ హాస్పిటల్, జనరల్ సర్జరీ మాజీ అధిపతి', hi: 'किंग जॉर्ज अस्पताल, जनरल सर्जरी के पूर्व प्रमुख' },
        { s: '.doc-hero-creds li:nth-child(2)', en: 'Apollo-trained in laparoscopic surgery', te: 'అపోలోలో లాపరోస్కోపిక్ సర్జరీ శిక్షణ', hi: 'अपोलो में लेप्रोस्कोपिक सर्जरी प्रशिक्षित' },
        { s: '.doc-hero-creds li:nth-child(3)', en: '25+ years — gall bladder, hernia, thyroid, breast & more', te: '25+ సంవత్సరాలు — పిత్తాశయం, హెర్నియా, థైరాయిడ్, స్తనం & మరిన్ని', hi: '25+ वर्ष — पित्ताशय, हर्निया, थायरॉइड, स्तन व अधिक' },

        // About
        { s: '#about .eyebrow', en: 'About the surgeon', te: 'సర్జన్ గురించి', hi: 'सर्जन के बारे में' },
        { s: '#about .sec-head h2', en: 'A career built inside the institutions Vizag trusts.', te: 'విశాఖ నమ్మే సంస్థల్లో నిర్మించిన వృత్తిజీవితం.', hi: 'विशाखा की भरोसेमंद संस्थाओं में बना करियर।' },
        { s: '#about .sec-head p', en: 'Reputation in surgery is earned slowly. Dr. Rao spent decades teaching and leading at the city\u2019s largest public hospital before bringing that same standard of care to MGR Hospital.', te: 'సర్జరీలో ప్రతిష్ఠ నెమ్మదిగా సాధించబడుతుంది. డా. రావు నగరంలోని అతిపెద్ద ప్రభుత్వ ఆసుపత్రిలో దశాబ్దాలు బోధన మరియు నాయకత్వం చేసి, అదే సేవా ప్రమాణాన్ని MGR హాస్పిటల్‌కు తీసుకొచ్చారు.', hi: 'सर्जरी में प्रतिष्ठा धीरे-धीरे अर्जित होती है। डॉ. राव ने शहर के सबसे बड़े सरकारी अस्पताल में दशकों तक अध्यापन और नेतृत्व किया, फिर वही देखभाल का स्तर MGR अस्पताल में लाए।' },

        // Timeline
        { s: '.timeline h3', en: 'The path behind the practice', te: 'వైద్య ప్రయాణం', hi: 'अभ्यास के पीछे का मार्ग' },
        { s: '.timeline .intro', en: 'Each role added to a surgeon patients can rely on \u2014 academic depth, leadership, and a long record of careful operating.', te: 'ప్రతి పాత్ర రోగులు నమ్మగలిగే ఒక సర్జన్‌ని నిర్మించింది — విద్యా లోతు, నాయకత్వం మరియు జాగ్రత్తగా ఆపరేషన్ చేసిన సుదీర్ఘ రికార్డు.', hi: 'हर भूमिका ने एक ऐसे सर्जन को गढ़ा जिस पर मरीज़ भरोसा कर सकें — शैक्षणिक गहराई, नेतृत्व, और सावधानीपूर्ण ऑपरेशन का लंबा रिकॉर्ड।' },

        // Specializations
        { s: '#specializations .eyebrow', en: 'Areas of expertise', te: 'నైపుణ్య రంగాలు', hi: 'विशेषज्ञता के क्षेत्र' },
        { s: '#specializations .sec-head h2', en: 'Procedures, explained plainly.', te: 'ప్రక్రియలు, సరళంగా వివరించబడినవి.', hi: 'प्रक्रियाएँ, सरल भाषा में।' },
        { s: '#specializations .sec-head p', en: 'General surgery covers the careful preoperative, operative and post-operative management of a wide range of conditions. These are the procedures Dr. Rao performs most often.', te: 'జనరల్ సర్జరీ అనేక పరిస్థితుల యొక్క జాగ్రత్తగా ఆపరేషన్ పూర్వ, ఆపరేషన్ మరియు ఆపరేషన్ అనంతర నిర్వహణను కలిగి ఉంటుంది. డా. రావు ఎక్కువగా చేసే ప్రక్రియలు ఇవి.', hi: 'जनरल सर्जरी में कई स्थितियों का सावधानीपूर्ण ऑपरेशन-पूर्व, ऑपरेशन और ऑपरेशन-पश्चात प्रबंधन शामिल है। ये वो प्रक्रियाएँ हैं जो डॉ. राव सबसे अधिक करते हैं।' },

        // Spec cards (titles)
        { s: '.spec-grid .spec:nth-child(1) h4', en: 'Gall bladder stones', te: 'పిత్తాశయ రాళ్ళు', hi: 'पित्ताशय की पथरी' },
        { s: '.spec-grid .spec:nth-child(2) h4', en: 'Hernia repair', te: 'హెర్నియా మరమ్మతు', hi: 'हर्निया की मरम्मत' },
        { s: '.spec-grid .spec:nth-child(3) h4', en: 'Piles, fissure & fistula', te: 'మూలవ్యాధి, ఫిషర్ & ఫిస్టులా', hi: 'बवासीर, फिशर और भगंदर' },
        { s: '.spec-grid .spec:nth-child(4) h4', en: 'Thyroid surgery', te: 'థైరాయిడ్ సర్జరీ', hi: 'थायरॉइड सर्जरी' },
        { s: '.spec-grid .spec:nth-child(5) h4', en: 'Breast tumours', te: 'స్తన కణతులు', hi: 'स्तन ट्यूमर' },
        { s: '.spec-grid .spec:nth-child(6) h4', en: 'Appendix & hysterectomy', te: 'అపెండిక్స్ & హిస్టెరెక్టమీ', hi: 'अपेंडिक्स और हिस्टेरेक्टॉमी' },

        // Approach
        { s: '#approach .sec-head:first-child .eyebrow', en: 'Our approach', te: 'మా విధానం', hi: 'हमारा दृष्टिकोण' },
        { s: '#approach .sec-head:first-child h2', en: 'Two ways to operate \u2014 always the right one for you.', te: 'ఆపరేషన్ చేయడానికి రెండు మార్గాలు — ఎల్లప్పుడూ మీకు సరైనది.', hi: 'ऑपरेशन के दो तरीक़े — हमेशा आपके लिए सही।' },
        { s: '#approach .why-card:nth-child(1) .lab', en: 'Minimally invasive', te: 'కనిష్ట ఆక్రమణ', hi: 'न्यूनतम चीरा' },
        { s: '#approach .why-card:nth-child(1) h3', en: 'Laparoscopic surgery', te: 'లాపరోస్కోపిక్ సర్జరీ', hi: 'लेप्रोस्कोपिक सर्जरी' },
        { s: '#approach .why-card:nth-child(2) .lab', en: 'When it\u2019s the safer choice', te: 'సురక్షితమైన ఎంపిక అయినప్పుడు', hi: 'जब यह सुरक्षित विकल्प हो' },
        { s: '#approach .why-card:nth-child(2) h3', en: 'Open surgery', te: 'ఓపెన్ సర్జరీ', hi: 'ओपन सर्जरी' },

        // Care stages
        { s: '#approach .care:nth-child(1) h4', en: 'Before surgery', te: 'సర్జరీకి ముందు', hi: 'सर्जरी से पहले' },
        { s: '#approach .care:nth-child(2) h4', en: 'During surgery', te: 'సర్జరీ సమయంలో', hi: 'सर्जरी के दौरान' },
        { s: '#approach .care:nth-child(3) h4', en: 'After surgery', te: 'సర్జరీ తర్వాత', hi: 'सर्जरी के बाद' },

        // Gallery
        { s: '#gallery .eyebrow', en: 'Inside MGR Hospital', te: 'MGR హాస్పిటల్ లోపల', hi: 'MGR अस्पताल के अंदर' },
        { s: '#gallery .sec-head h2', en: 'A hospital equipped for safe surgery.', te: 'సురక్షిత సర్జరీ కోసం సన్నద్ధమైన ఆసుపత్రి.', hi: 'सुरक्षित सर्जरी के लिए सुसज्जित अस्पताल।' },

        // Appointment
        { s: '#appointment .eyebrow', en: 'Book a consultation', te: 'సంప్రదింపు బుక్ చేయండి', hi: 'परामर्श बुक करें' },
        { s: '#appointment h2', en: 'Talk to Dr. Rao about what\u2019s worrying you.', te: 'మిమ్మల్ని ఆందోళనపరుస్తున్న విషయం గురించి డా. రావుతో మాట్లాడండి.', hi: 'डॉ. राव से अपनी चिंता के बारे में बात करें।' },
        { s: '.fees .frow:nth-child(1) span', en: 'Consultation \u2014 prior appointment', te: 'సంప్రదింపు — ముందస్తు అపాయింట్‌మెంట్', hi: 'परामर्श — पूर्व अपॉइंटमेंट' },
        { s: '.fees .frow:nth-child(2) span', en: 'Consultation \u2014 direct visit', te: 'సంప్రదింపు — ప్రత్యక్ష సందర్శన', hi: 'परामर्श — सीधे आएँ' },

        // Contact
        { s: '#contact .eyebrow', en: 'Visit us', te: 'మమ్మల్ని సందర్శించండి', hi: 'हमसे मिलें' },
        { s: '#contact .sec-head h2', en: 'Find MGR Hospital & navigate in one tap.', te: 'MGR హాస్పిటల్ కనుగొని ఒక ట్యాప్‌లో నావిగేట్ చేయండి.', hi: 'MGR अस्पताल खोजें और एक टैप में नेविगेट करें।' },
        { s: '.contact-list .cinfo:nth-child(1) .lab', en: 'Hospital line', te: 'ఆసుపత్రి ఫోన్', hi: 'अस्पताल फ़ोन' },
        { s: '.contact-list .cinfo:nth-child(1) .sub', en: 'For appointments & emergencies', te: 'అపాయింట్‌మెంట్లు & ఎమర్జెన్సీల కోసం', hi: 'अपॉइंटमेंट और आपातकाल के लिए' },
        { s: '.contact-list .cinfo:nth-child(3) .sub', en: 'For records & general enquiries', te: 'రికార్డులు & సాధారణ విచారణల కోసం', hi: 'रिकॉर्ड और सामान्य पूछताछ के लिए' },
        { s: '.loc-info .lab', en: 'Our location', te: 'మా స్థానం', hi: 'हमारा स्थान' },

        // Video
        { s: '#video .eyebrow', en: 'Watch', te: 'చూడండి', hi: 'देखें' },
        { s: '#video .sec-head h2', en: 'A closer look at MGR Hospital.', te: 'MGR హాస్పిటల్ దగ్గరి చూపు.', hi: 'MGR अस्पताल पर करीबी नज़र।' },

        // Footer
        { s: 'footer h5:nth-of-type(1)', en: 'Explore', te: 'అన్వేషించండి', hi: 'देखें' },
        { s: 'footer h5:nth-of-type(2)', en: 'Reach us', te: 'మమ్మల్ని సంప్రదించండి', hi: 'हमसे संपर्क' },
        { s: '.foot-social-label', en: 'Follow us', te: 'మమ్మల్ని అనుసరించండి', hi: 'हमें फॉलो करें' },

        // Action bar
        { s: '.ab-call .ab-lbl', en: 'Call us', te: 'కాల్', hi: 'कॉल' },
        { s: '.ab-wa .ab-lbl', en: 'Book', te: 'బుక్', hi: 'बुक' },
        { s: '.ab-nav .ab-lbl', en: 'Navigate', te: 'దిశ', hi: 'दिशा' },

        // Call chooser popup
        { s: '.call-title', en: 'Call MGR Hospital', te: 'MGR హాస్పిటల్‌కు కాల్ చేయండి', hi: 'MGR अस्पताल को कॉल करें' },
        { s: '.call-sub', en: 'Choose a number — it opens your phone dialer.', te: 'ఒక నంబర్ ఎంచుకోండి — మీ డయలర్ తెరుచుకుంటుంది.', hi: 'एक नंबर चुनें — आपका डायलर खुल जाएगा।' },
        { s: '.call-go-lbl', en: 'Call', te: 'కాల్', hi: 'कॉल' },

        // PWA banner
        { s: '.pwaib__text strong', en: 'Install MGR Hospital', te: 'MGR హాస్పిటల్ ఇన్‌స్టాల్ చేయండి', hi: 'MGR अस्पताल इंस्टॉल करें' },
      ];

      function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(LANG_KEY, lang);
        document.documentElement.setAttribute('lang', lang === 'te' ? 'te' : lang === 'hi' ? 'hi' : 'en');
        i18n.forEach(function (item) {
          var els = document.querySelectorAll(item.s);
          els.forEach(function (el) { el.textContent = item[lang] || item.en; });
        });
        // Sync active state on all lang buttons
        document.querySelectorAll('.lang-btn, .lang-btn-sm').forEach(function (btn) {
          btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
      }

      // Wire up language buttons (side menu + desktop)
      ['langSwitch', 'langSwitchSm'].forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-lang]');
          if (!btn) return;
          setLanguage(btn.getAttribute('data-lang'));
        });
      });

      // Apply saved language on load
      if (currentLang !== 'en') setLanguage(currentLang);
      else {
        // Sync active buttons even for default English
        document.querySelectorAll('.lang-btn, .lang-btn-sm').forEach(function (btn) {
          btn.classList.toggle('active', btn.getAttribute('data-lang') === 'en');
        });
      }
    })();

/* Mobile deferred-paint workaround: some Chromium / Android WebView builds do not
   paint the composited social / share / hamburger icons until an interaction
   (the user had to press-and-hold to reveal them). Force one repaint on load,
   which mimics the :active transform and makes them appear immediately. */
(function () {
  function nudge() {
    var els = document.querySelectorAll('.social-ic, .nav-act, .foot-act, .nav-social-row a, .burger');
    for (var i = 0; i < els.length; i++) {
      els[i].style.transform = 'translateZ(0)';
      void els[i].offsetHeight; /* force reflow + paint invalidation */
    }
    requestAnimationFrame(function () {
      for (var j = 0; j < els.length; j++) { els[j].style.transform = ''; }
    });
  }
  if (document.readyState === 'complete') nudge();
  else window.addEventListener('load', nudge);
})();
