/* ==========================================================================
   JanSetu AI - Premium JavaScript Logic (Hackathon Prototype)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Global Utilities & Initialization ---
    
    // Remove Premium App Boot Loader
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) loader.classList.add('hidden');
    }, 1000);

    // Smooth Scrolling for all anchor links (Fixed to ignore empty hashes)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty anchors used for JS triggers
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Premium Toast Notification System
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        let icon = type === 'success' ? '<i class="fa-solid fa-circle-check" style="color: var(--success); font-size: 1.2rem;"></i>' : 
                   '<i class="fa-solid fa-triangle-exclamation" style="color: var(--warning); font-size: 1.2rem;"></i>';
        
        toast.innerHTML = `${icon} <span>${escapeHTML(message)}</span>`;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // Secure HTML Escaping
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
            }[tag])
        );
    }

    // --- 2. Theme & Language Toggle ---
    
    let currentLang = 'en'; 

    // Dark Mode Toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeBtn.querySelector('i');
    
    if (localStorage.getItem('jansetu_theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('jansetu_theme', isDark ? 'dark' : 'light');
        themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });

    // Language Toggle
    const langBtn = document.getElementById('lang-toggle-btn');
    const langText = document.getElementById('lang-text');
    
    function updateLanguage() {
        // Now safely updates text without destroying parent icons
        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerHTML = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-hi');
        });
        document.querySelectorAll('input[data-en], textarea[data-en]').forEach(el => {
            el.placeholder = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-hi');
        });
        langText.textContent = currentLang === 'en' ? 'हिन्दी' : 'English';
    }

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'hi' : 'en';
        updateLanguage();
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    mobileBtn.addEventListener('click', () => navLinks.classList.toggle('show'));
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('show'));
    });

    // --- 3. Smart Scheme Finder Logic ---
    
    const schemesData = [
        {
            name: { en: "PM Kisan Samman Nidhi", hi: "पीएम किसान सम्मान निधि" },
            desc: { en: "Direct income support for small and marginal farmers.", hi: "छोटे और सीमांत किसानों के लिए प्रत्यक्ष आय सहायता।" },
            criteria: { occupation: ['farmer'], maxIncome: 1000000 },
            benefits: { en: "₹6,000 / year", hi: "₹6,000 / वर्ष" }
        },
        {
            name: { en: "Ayushman Bharat PM-JAY", hi: "आयुष्मान भारत पीएम-जय" },
            desc: { en: "World's largest health insurance scheme for low-income families.", hi: "कम आय वाले परिवारों के लिए दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना।" },
            criteria: { maxIncome: 250000 },
            benefits: { en: "₹5 Lakhs Cover", hi: "₹5 लाख कवर" }
        },
        {
            name: { en: "Stand-Up India Scheme", hi: "स्टैंड-अप इंडिया योजना" },
            desc: { en: "Bank loans for setting up greenfield enterprises.", hi: "नए उद्यम स्थापित करने के लिए बैंक ऋण।" },
            criteria: { category: ['sc_st', 'minority', 'obc'], occupation: ['entrepreneur', 'unemployed'] },
            benefits: { en: "₹10L - ₹1Cr Loan", hi: "₹10 लाख - ₹1 करोड़ ऋण" }
        },
        {
            name: { en: "Post Matric Scholarship", hi: "पोस्ट मैट्रिक छात्रवृत्ति" },
            desc: { en: "Financial assistance for higher education.", hi: "उच्च शिक्षा के लिए वित्तीय सहायता।" },
            criteria: { occupation: ['student'], category: ['sc_st', 'obc', 'minority'], maxIncome: 250000 },
            benefits: { en: "Tuition + Allowance", hi: "ट्यूशन + भत्ता" }
        },
        {
            name: { en: "Sukanya Samriddhi Yojana", hi: "सुकन्या समृद्धि योजना" },
            desc: { en: "High-interest savings scheme targeted at parents of girl children.", hi: "बालिकाओं के माता-पिता को लक्षित उच्च-ब्याज बचत योजना।" },
            criteria: { gender: ['female'], maxAge: 25 }, 
            benefits: { en: "Tax-free High ROI", hi: "कर-मुक्त उच्च ROI" }
        },
        {
            name: { en: "PM Mudra Yojana", hi: "पीएम मुद्रा योजना" },
            desc: { en: "Collateral-free loans for non-corporate small/micro enterprises.", hi: "गैर-कॉर्पोरेट छोटे/सूक्ष्म उद्यमों के लिए संपार्श्विक-मुक्त ऋण।" },
            criteria: { occupation: ['entrepreneur', 'farmer', 'unemployed'] },
            benefits: { en: "Up to ₹10 Lakhs", hi: "₹10 लाख तक" }
        }
    ];

    const schemeForm = document.getElementById('scheme-form');
    const schemeResults = document.getElementById('scheme-results');
    const resultsCount = document.getElementById('results-count');

    schemeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const age = parseInt(document.getElementById('scheme-age').value);
        const gender = document.getElementById('scheme-gender').value;
        const occupation = document.getElementById('scheme-occupation').value;
        const category = document.getElementById('scheme-category').value;
        const income = parseInt(document.getElementById('scheme-income').value);

        // Matching Logic
        const matchedSchemes = schemesData.filter(scheme => {
            if (scheme.criteria.maxIncome && income > scheme.criteria.maxIncome) return false;
            if (scheme.criteria.minAge && age < scheme.criteria.minAge) return false;
            if (scheme.criteria.maxAge && age > scheme.criteria.maxAge) return false;
            if (scheme.criteria.gender && !scheme.criteria.gender.includes(gender)) return false;
            if (scheme.criteria.occupation && !scheme.criteria.occupation.includes(occupation)) return false;
            if (scheme.criteria.category && !scheme.criteria.category.includes(category)) return false;
            return true;
        });

        // Premium Render Results
        schemeResults.innerHTML = '';
        resultsCount.textContent = `${matchedSchemes.length} Matches`;

        if (matchedSchemes.length === 0) {
            schemeResults.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-box-open" style="color: var(--border-color)"></i>
                    <h4 style="color: var(--text-main); margin-top: 1rem;">No direct matches found</h4>
                    <p>${currentLang === 'en' ? 'Try adjusting your income or occupation criteria.' : 'कृपया अपनी आय या व्यवसाय मानदंड बदलें।'}</p>
                </div>
            `;
            return;
        }

        matchedSchemes.forEach(scheme => {
            const div = document.createElement('div');
            div.className = 'scheme-item';
            div.innerHTML = `
                <h4><i class="fa-solid fa-circle-check"></i> ${escapeHTML(scheme.name[currentLang])}</h4>
                <p>${escapeHTML(scheme.desc[currentLang])}</p>
                <div class="scheme-meta">
                    <span style="color: var(--primary);"><i class="fa-solid fa-bolt"></i> Benefit: ${escapeHTML(scheme.benefits[currentLang])}</span>
                    <span><i class="fa-solid fa-users"></i> Profile Matched</span>
                </div>
            `;
            schemeResults.appendChild(div);
        });

        showToast(currentLang === 'en' ? 'Eligibility analysis complete!' : 'पात्रता विश्लेषण पूरा हुआ!');
        if(window.innerWidth < 1024) schemeResults.scrollIntoView({behavior: 'smooth', block: 'center'});
    });

    // --- 4. Document & Process Simplifier AI Simulation ---

    const docInput = document.getElementById('raw-document-text');
    const simplifyBtn = document.getElementById('simplify-btn');
    const docOutput = document.getElementById('simplifier-output');

    document.getElementById('sample-tax-notice').addEventListener('click', () => {
        docInput.value = "Whereas an assessment has been made under section 143(3) of the Income Tax Act, 1961. You are hereby requested to remit the outstanding tax liability of Rs. 14,500 within 30 days of the receipt of this notice to avoid penal interest under section 234B and 234C.";
        showToast("Tax sample loaded successfully.");
    });
    
    document.getElementById('sample-property-notice').addEventListener('click', () => {
        docInput.value = "As per Municipal Corporation Guidelines 2024, for the process of property mutation, the applicant must submit Form-A along with the registered sale deed, up-to-date property tax receipts, and an NOC from the housing society. Failure to submit within 90 days of registration attracts a late fee.";
        showToast("Property sample loaded successfully.");
    });

    simplifyBtn.addEventListener('click', () => {
        const text = docInput.value.trim().toLowerCase();
        if (!text) {
            showToast(currentLang === 'en' ? 'Please paste some text first.' : 'कृपया पहले कुछ टेक्स्ट पेस्ट करें।', 'error');
            return;
        }

        docOutput.innerHTML = `<div class="empty-state"><div class="loader-spinner"></div><p>${currentLang === 'en' ? 'Processing legal jargon...' : 'कानूनी शब्दावली का विश्लेषण कर रहा है...'}</p></div>`;
        simplifyBtn.disabled = true;

        setTimeout(() => {
            simplifyBtn.disabled = false;
            let resultHTML = '';

            if (text.includes('tax') || text.includes('143(3)')) {
                resultHTML = `
                    <div class="simplified-content">
                        <span class="badge badge-admin">Income Tax Notice</span>
                        <h4>${currentLang === 'en' ? 'The Bottom Line' : 'मुख्य बात'}</h4>
                        <p>${currentLang === 'en' ? 'The tax department reviewed your file and requires a payment for outstanding taxes.' : 'कर विभाग ने आपकी फ़ाइल की समीक्षा की है और बकाया करों के लिए भुगतान की आवश्यकता है।'}</p>
                        
                        <h4>${currentLang === 'en' ? 'Action Checklist' : 'आवश्यक कार्य सूची'}</h4>
                        <ul>
                            <li>Pay exactly <strong>₹14,500</strong>.</li>
                            <li>Deadline: Within <strong>30 days</strong> of receiving the letter.</li>
                            <li>Warning: Missing the deadline will result in extra financial penalties.</li>
                        </ul>
                    </div>
                `;
            } else if (text.includes('mutation') || text.includes('municipal')) {
                resultHTML = `
                    <div class="simplified-content">
                        <span class="badge">Property Mutation</span>
                        <h4>${currentLang === 'en' ? 'The Bottom Line' : 'मुख्य बात'}</h4>
                        <p>${currentLang === 'en' ? 'You must legally register yourself as the new owner of the property in local municipality records.' : 'आपको आधिकारिक नगरपालिका रिकॉर्ड में खुद को नए मालिक के रूप में पंजीकृत करना होगा।'}</p>
                        
                        <h4>${currentLang === 'en' ? 'Required Documents' : 'आवश्यक दस्तावेज़'}</h4>
                        <ul>
                            <li>Application Form-A (filled out).</li>
                            <li>Original Sale Deed (Property Registry).</li>
                            <li>Previous owner's paid tax receipts.</li>
                            <li>NOC (No Objection Certificate) from your society.</li>
                        </ul>
                        <p style="margin-top: 1rem; color: var(--danger); font-weight: 600;">
                            <i class="fa-solid fa-clock"></i> Deadline: Submit within 90 days to avoid late fees.
                        </p>
                    </div>
                `;
            } else {
                resultHTML = `
                    <div class="simplified-content">
                        <span class="badge">General Notice</span>
                        <h4>${currentLang === 'en' ? 'AI Summary' : 'एआई सारांश'}</h4>
                        <p>${currentLang === 'en' ? 'This appears to be a formal administrative document. Look closely for dates, financial amounts, or lists of required paperwork in the original text.' : 'यह एक औपचारिक प्रशासनिक दस्तावेज प्रतीत होता है। तिथियां और राशियां खोजें।'}</p>
                        <p style="color: var(--text-light); font-size: 0.8rem; margin-top: 2rem;">*AI simulation for hackathon prototype. Not legal advice.</p>
                    </div>
                `;
            }
            docOutput.innerHTML = resultHTML;
            showToast(currentLang === 'en' ? 'Document simplified!' : 'दस्तावेज़ सफलतापूर्वक सरल किया गया!');
        }, 1200);
    });

    // --- 5. Civic Complaints & Premium Timeline Tracker ---

    const complaintForm = document.getElementById('complaint-form');
    const complaintsContainer = document.getElementById('complaints-list-container');
    const adminTbody = document.getElementById('admin-complaints-tbody');
    const searchTrackerBtn = document.getElementById('search-tracker-btn');
    const searchTrackerInput = document.getElementById('search-tracker-input');

    let complaintsDb = JSON.parse(localStorage.getItem('jansetu_complaints')) || [];

    function saveComplaints() {
        localStorage.setItem('jansetu_complaints', JSON.stringify(complaintsDb));
    }

    function generateRefID() {
        return 'JS-' + Math.floor(1000 + Math.random() * 9000); 
    }

    // Submit Complaint
    complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newComplaint = {
            id: generateRefID(),
            title: document.getElementById('comp-title').value,
            category: document.getElementById('comp-category').value,
            location: document.getElementById('comp-location').value,
            citizen: document.getElementById('comp-citizen').value,
            status: 'Pending',
            date: new Date().toLocaleDateString()
        };

        complaintsDb.unshift(newComplaint);
        saveComplaints();
        complaintForm.reset();
        
        showToast(currentLang === 'en' ? `Grievance filed! Ref ID: ${newComplaint.id}` : `शिकायत दर्ज! संदर्भ: ${newComplaint.id}`);
        renderTracker();
        renderAdmin();
    });

    // Render Tracker (Citizen View with Apple-Style Timeline)
    function renderTracker(filterQuery = '') {
        complaintsContainer.innerHTML = '';
        
        const filtered = complaintsDb.filter(c => 
            c.id.toLowerCase().includes(filterQuery.toLowerCase()) || 
            c.title.toLowerCase().includes(filterQuery.toLowerCase())
        );

        if (filtered.length === 0) {
            complaintsContainer.innerHTML = `
                <div class="empty-state">
                    <p style="color: var(--text-light); font-weight: 600;">No grievance records found.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(c => {
            let statusBadge = 'status-pending';
            if (c.status === 'In Progress') statusBadge = 'status-progress';
            if (c.status === 'Resolved') statusBadge = 'status-resolved';

            // Logic to determine active timeline steps
            const step1 = true; // Always submitted
            const step2 = (c.status === 'In Progress' || c.status === 'Resolved');
            const step3 = (c.status === 'Resolved');

            const div = document.createElement('div');
            div.className = 'complaint-ticket';
            div.innerHTML = `
                <div class="ticket-header">
                    <span class="ticket-id"><i class="fa-solid fa-hashtag"></i> ${escapeHTML(c.id)}</span>
                    <span class="ticket-status ${statusBadge}">${escapeHTML(c.status)}</span>
                </div>
                <h4 style="margin-bottom:0.25rem; font-size: 1.05rem; color: var(--navy);">${escapeHTML(c.title)}</h4>
                <p style="font-size:0.85rem; color:var(--text-light); font-weight: 600; margin-bottom: 1rem;">
                    <i class="fa-solid fa-location-dot"></i> ${escapeHTML(c.location)}
                </p>
                
                <!-- Premium SaaS Timeline CSS Implementation -->
                <div class="timeline">
                    <div class="timeline-item ${step1 ? 'active' : ''}">
                        <strong>Submitted</strong> <span style="color: var(--text-light); font-size: 0.8rem;">- Verified in system</span>
                    </div>
                    <div class="timeline-item ${step2 ? 'active' : ''}">
                        <strong>In Progress</strong> <span style="color: var(--text-light); font-size: 0.8rem;">- Assigned to civic body</span>
                    </div>
                    <div class="timeline-item ${step3 ? 'active' : ''}">
                        <strong>Resolved</strong> <span style="color: var(--text-light); font-size: 0.8rem;">- Action taken</span>
                    </div>
                </div>
            `;
            complaintsContainer.appendChild(div);
        });
    }

    searchTrackerBtn.addEventListener('click', () => renderTracker(searchTrackerInput.value));
    searchTrackerInput.addEventListener('keyup', (e) => renderTracker(e.target.value));

    // Render Admin Panel
    function renderAdmin() {
        adminTbody.innerHTML = '';
        
        if (complaintsDb.length === 0) {
            adminTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 3rem;">No active records.</td></tr>`;
            return;
        }

        complaintsDb.forEach((c, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><span class="ticket-id">${escapeHTML(c.id)}</span><br><small style="color:var(--text-light)">${c.date}</small></td>
                <td><strong>${escapeHTML(c.title)}</strong><br><small style="color:var(--text-light)">${escapeHTML(c.category)}</small></td>
                <td><span style="font-weight:600">${escapeHTML(c.citizen)}</span><br><small style="color:var(--text-light)">${escapeHTML(c.location)}</small></td>
                <td><span class="ticket-status ${c.status === 'Pending' ? 'status-pending' : c.status === 'In Progress' ? 'status-progress' : 'status-resolved'}">${escapeHTML(c.status)}</span></td>
                <td>
                    <select class="admin-action-select" data-index="${index}" style="background: var(--bg-alt); border: 1px solid var(--border-color);">
                        <option value="Pending" ${c.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                    </select>
                </td>
            `;
            adminTbody.appendChild(tr);
        });

        document.querySelectorAll('.admin-action-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const index = e.target.getAttribute('data-index');
                const newStatus = e.target.value;
                complaintsDb[index].status = newStatus;
                saveComplaints();
                renderAdmin();
                renderTracker(); 
                showToast(`System Updated: Ref ${complaintsDb[index].id} is now ${newStatus}`);
            });
        });
    }

    renderTracker();
    renderAdmin();

    // --- 6. Multilingual AI Assistant (Chatbot) ---
    
    const chatToggle = document.getElementById('chatbot-toggle-btn');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close-btn');
    const chatInput = document.getElementById('chatbot-input');
    const chatSendBtn = document.getElementById('chatbot-send-btn');
    const chatMessages = document.getElementById('chatbot-messages');
    
    // Feature Card Chatbot Trigger Fix
    const openChatbotLink = document.getElementById('open-chatbot-link');
    if (openChatbotLink) {
        openChatbotLink.addEventListener('click', (e) => {
            e.preventDefault();
            chatWindow.classList.remove('hidden');
            chatToggle.style.transform = 'scale(0) rotate(-45deg)';
            chatToggle.style.opacity = '0';
        });
    }

    // Smooth toggling with scale transforms (handled via CSS classes)
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.remove('hidden');
        chatToggle.style.transform = 'scale(0) rotate(-45deg)';
        chatToggle.style.opacity = '0';
    });
    chatClose.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        chatToggle.style.transform = 'scale(1) rotate(0deg)';
        chatToggle.style.opacity = '1';
    });

    function appendMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender === 'bot' ? 'bot-message' : 'user-message'}`;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(input) {
        const query = input.toLowerCase();
        
        if (query.includes('scheme') || query.includes('योजना')) {
            return currentLang === 'en' ? 
                "Navigate to the 'Scheme Finder' section. Just enter your profile details, and we'll instantly match you with eligible government programs." : 
                "होम पेज पर हमारे योजना खोजक का उपयोग करें!";
        }
        if (query.includes('complaint') || query.includes('शिकायत')) {
            return currentLang === 'en' ? 
                "Scroll down to the 'Grievance Redressal' portal. Fill out the short form, and our system will generate a live tracking timeline for you." : 
                "शिकायत दर्ज करने के लिए 'नागरिक शिकायत पोर्टल' पर जाएं।";
        }
        if (query.includes('track') || query.includes('status')) {
            return currentLang === 'en' ? 
                "You can track your issue live! Enter your Reference ID (e.g., JS-1234) in the Timeline Tracker next to the complaint form." : 
                "शिकायत फॉर्म के बगल में ट्रैकर अनुभाग में अपनी संदर्भ आईडी दर्ज करें।";
        }
        if (query.includes('document') || query.includes('notice')) {
            return currentLang === 'en' ? 
                "Use the 'Document Simplifier'. Paste any complex legal notice into the box, and I'll generate a plain-English summary and checklist." : 
                "दस्तावेज़ सरलकर्ता अनुभाग में अपना जटिल नोटिस पेस्ट करें।";
        }
        if (query.includes('hello') || query.includes('hi') || query.includes('नमस्ते')) {
            return currentLang === 'en' ? "Namaste! I am JanSetu Copilot. How can I assist you with governance today?" : "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?";
        }

        return currentLang === 'en' ? 
            "I'm currently a prototype for the Hackathon! I specialize in Schemes, Legal Documents, and Complaints. Try asking about one of those." : 
            "मैं हैकथॉन के लिए एक एआई प्रोटोटाइप हूं। कृपया योजनाओं या शिकायतों के बारे में पूछें।";
    }

    function handleChat() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        appendMessage(text, 'user');
        chatInput.value = '';
        
        setTimeout(() => {
            const reply = getBotResponse(text);
            appendMessage(reply, 'bot');
        }, 800); // Slight delay for SaaS realism
    }

    chatSendBtn.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            chatInput.value = e.target.getAttribute('data-query');
            handleChat();
        });
    });

});