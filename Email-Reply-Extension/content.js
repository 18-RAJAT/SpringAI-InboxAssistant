function createAIButton() {
    const button = document.createElement("button");
    button.className = "ai-reply-button";
    button.style.marginRight = "12px";
    button.style.padding = "10px 20px";
    button.style.borderRadius = "6px";
    button.style.backgroundColor = "#1a73e8";
    button.style.color = "white";
    button.style.fontWeight = "500";
    button.style.fontSize = "14px";
    button.style.cursor = "pointer";
    button.style.border = "none";
    button.style.transition = "all 0.2s ease";
    button.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";
    button.style.position = "relative"; // Added for better hover handling
    button.style.zIndex = "1"; // Added for better hover handling
    button.innerHTML = "AI Reply";
    button.setAttribute("role", "button");
    button.disabled = false;

    button.addEventListener("mouseover", () => {
        if (!button.disabled) {
            button.style.backgroundColor = "#1557b0";
            button.style.boxShadow = "0 2px 4px rgba(0,0,0,0.15)";
        }
    });
    button.addEventListener("mouseout", () => {
        if (!button.disabled) {
            button.style.backgroundColor = "#1a73e8";
            button.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";
        }
    });

    return button;
}

function createActionButtons(generatedText, composeBox, charCounter, aiButton) {
    const actionContainer = document.createElement("div");
    actionContainer.style.display = "flex";
    actionContainer.style.alignItems = "center";
    actionContainer.style.marginTop = "12px";
    actionContainer.style.gap = "8px";
    actionContainer.style.position = "relative"; // Added for better hover handling
    actionContainer.style.zIndex = "1"; // Added for better hover handling

    const acceptButton = document.createElement("button");
    acceptButton.textContent = "Accept";
    acceptButton.style.padding = "8px 20px";
    acceptButton.style.borderRadius = "4px";
    acceptButton.style.backgroundColor = "#1e8e3e";
    acceptButton.style.color = "white";
    acceptButton.style.border = "none";
    acceptButton.style.cursor = "pointer";
    acceptButton.style.fontWeight = "500";
    acceptButton.style.fontSize = "14px";
    acceptButton.style.transition = "all 0.2s ease";
    acceptButton.style.position = "relative"; // Added for better hover handling
    acceptButton.style.zIndex = "1"; // Added for better hover handling
    acceptButton.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";

    const rejectButton = document.createElement("button");
    rejectButton.textContent = "Reject";
    rejectButton.style.padding = "8px 20px";
    rejectButton.style.borderRadius = "4px";
    rejectButton.style.backgroundColor = "#d93025";
    rejectButton.style.color = "white";
    rejectButton.style.border = "none";
    rejectButton.style.cursor = "pointer";
    rejectButton.style.fontWeight = "500";
    rejectButton.style.fontSize = "14px";
    rejectButton.style.transition = "all 0.2s ease";
    rejectButton.style.position = "relative"; // Added for better hover handling
    rejectButton.style.zIndex = "1"; // Added for better hover handling
    rejectButton.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";

    acceptButton.addEventListener("mouseover", () => {
        acceptButton.style.backgroundColor = "#137333";
        acceptButton.style.boxShadow = "0 2px 4px rgba(0,0,0,0.15)";
    });
    acceptButton.addEventListener("mouseout", () => {
        acceptButton.style.backgroundColor = "#1e8e3e";
        acceptButton.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";
    });

    rejectButton.addEventListener("mouseover", () => {
        rejectButton.style.backgroundColor = "#b31412";
        rejectButton.style.boxShadow = "0 2px 4px rgba(0,0,0,0.15)";
    });
    rejectButton.addEventListener("mouseout", () => {
        rejectButton.style.backgroundColor = "#d93025";
        rejectButton.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";
    });

    acceptButton.addEventListener("click", () => {
        if (composeBox) {
            composeBox.innerHTML = generatedText;
            updateCharacterCount(composeBox, charCounter);
            showNotification("Reply accepted!");
        }
        actionContainer.remove();
        aiButton.disabled = false;
    });

    rejectButton.addEventListener("click", () => {
        if (composeBox) {
            composeBox.innerHTML = "";
            updateCharacterCount(composeBox, charCounter);
        }
        actionContainer.remove();
        aiButton.disabled = false;
        showNotification("Reply rejected. Generate a new one!", true);
    });

    actionContainer.appendChild(acceptButton);
    actionContainer.appendChild(rejectButton);

    return actionContainer;
}

function createToneSelector()
{
    const wrapper=document.createElement("div");
    wrapper.style.position="relative";
    wrapper.style.marginRight="12px";
    wrapper.style.minWidth="120px";

    const select=document.createElement("select");
    select.className="ai-tone-selector";
    select.style.width="100%";
    select.style.padding="8px 12px";
    select.style.borderRadius="6px";
    select.style.border="1px solid #dadce0";
    select.style.fontSize="14px";
    select.style.color="#3c4043";
    select.style.backgroundColor="white";
    select.style.cursor="pointer";
    select.style.appearance="none";
    select.style.paddingRight="30px";

    const tones=[
        {value: "professional", label: "Professional"},
        {value: "friendly", label: "Friendly"},
        {value: "formal", label: "Formal"},
        {value: "casual", label: "Casual"},
        {value: "enthusiastic", label: "Enthusiastic"},
        {value: "empathetic", label: "Empathetic"},
        {value: "direct", label: "Direct"},
        {value: "diplomatic", label: "Diplomatic"}
    ];

    tones.forEach(tone=>{
        const option=document.createElement("option");
        option.value=tone.value;
        option.text=tone.label;
        select.appendChild(option);
    });

    const arrow=document.createElement("div");
    arrow.style.position="absolute";
    arrow.style.right="12px";
    arrow.style.top="50%";
    arrow.style.transform="translateY(-50%)";
    arrow.style.pointerEvents="none";
    arrow.innerHTML="▼";
    arrow.style.fontSize="10px";
    arrow.style.color="#5f6368";

    wrapper.appendChild(select);
    wrapper.appendChild(arrow);

    select.addEventListener("focus",()=>{
        select.style.borderColor="#1a73e8";
        select.style.outline="none";
    });

    select.addEventListener("blur",()=>{
        select.style.borderColor="#dadce0";
    });

    return wrapper;
}

function createLanguageSelector()
{
    const wrapper=document.createElement("div");
    wrapper.style.position="relative";
    wrapper.style.marginRight="12px";
    wrapper.style.minWidth="120px";

    const select=document.createElement("select");
    select.className="ai-language-selector";
    select.style.width="100%";
    select.style.padding="8px 12px";
    select.style.borderRadius="6px";
    select.style.border="1px solid #dadce0";
    select.style.fontSize="14px";
    select.style.color="#3c4043";
    select.style.backgroundColor="white";
    select.style.cursor="pointer";
    select.style.appearance="none";
    select.style.paddingRight="30px";
    select.style.transition="border-color 0.2s ease";

    const languages=[
        {code: "en", name: "English"},
        {code: "es", name: "Español"},
        {code: "fr", name: "Français"},
        {code: "de", name: "Deutsch"},
        {code: "it", name: "Italiano"},
        {code: "pt", name: "Português"},
        {code: "nl", name: "Nederlands"},
        {code: "ru", name: "Русский"},
        {code: "zh", name: "中文"},
        {code: "ja", name: "日本語"},
        {code: "ko", name: "한국어"},
        {code: "hi", name: "हिंदी"}
    ];

    languages.forEach(lang=>{
        const option=document.createElement("option");
        option.value=lang.code;
        option.text=lang.name;
        select.appendChild(option);
    });

    const arrow=document.createElement("div");
    arrow.style.position="absolute";
    arrow.style.right="12px";
    arrow.style.top="50%";
    arrow.style.transform="translateY(-50%)";
    arrow.style.pointerEvents="none";
    arrow.innerHTML="▼";
    arrow.style.fontSize="10px";
    arrow.style.color="#5f6368";

    wrapper.appendChild(select);
    wrapper.appendChild(arrow);

    select.addEventListener("focus",()=>{
        select.style.borderColor="#1a73e8";
        select.style.outline="none";
    });

    select.addEventListener("blur",()=>{
        select.style.borderColor="#dadce0";
    });

    return wrapper;
}

function createCharacterCounter()
{
    const counter=document.createElement("span");
    counter.className="ai-char-counter";
    counter.style.fontSize="13px";
    counter.style.color="#5f6368";
    counter.style.marginLeft="8px";
    counter.style.minWidth="80px";
    counter.style.textAlign="right";
    counter.textContent="0/2,000";
    return counter;
}

function createLoadingSpinner()
{
    const spinner=document.createElement("div");
    spinner.className="ai-spinner";
    spinner.style.display="inline-block";
    spinner.style.width="20px";
    spinner.style.height="20px";
    spinner.style.marginLeft="10px";
    spinner.style.border="3px solid rgba(255, 255, 255, 0.3)";
    spinner.style.borderRadius="50%";
    spinner.style.borderTopColor="#007bff";
    spinner.style.animation="spin 0.8s ease-in-out infinite";
    spinner.style.boxShadow="0 0 8px rgba(0, 123, 255, 0.5)";

    const style=document.createElement("style");
    style.textContent = `
        @keyframes spin
        {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(180deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    return spinner;
}

function getEmailContent()
{
    const selectors=[
        ".h7",
        ".a3s.aiL",
        ".gmail_quote",
        "[role='presentation']"
    ];
    for(const selector of selectors)
    {
        const content=document.querySelector(selector);
        if(content)
        {
            return content.innerText.trim();
        }
    }
    return '';
}

function findComposeToolbar()
{
    const selectors=[
        ".btC",
        ".aDh",
        "[role='toolbar']",
        ".gU.Up"
    ];
    for(const selector of selectors)
    {
        const toolbar=document.querySelector(selector);
        if(toolbar)
        {
            return toolbar;
        }
    }
    return null;
}

function showNotification(message, isError=false)
{
    const notification=document.createElement("div");
    notification.style.position="fixed";
    notification.style.bottom="24px";
    notification.style.right="24px";
    notification.style.padding="12px 24px";
    notification.style.borderRadius="8px";
    notification.style.backgroundColor=isError ? "#d93025" : "#1e8e3e";
    notification.style.color="white";
    notification.style.fontSize="14px";
    notification.style.zIndex="9999";
    notification.style.boxShadow="0 2px 6px rgba(0,0,0,0.2)";
    notification.style.transition="opacity 0.3s ease";
    notification.textContent=message;

    document.body.appendChild(notification);

    setTimeout(()=>{
        notification.style.opacity="0";
        setTimeout(()=>notification.remove(), 300);
    }, 3000);
}

function updateCharacterCount(composeBox, counter)
{
    const text=composeBox.innerText;
    const count=text.length;
    counter.textContent=`${count.toLocaleString()}/2,000`;
    if(count>2000)
    {
        counter.style.color="#d93025";
    }
    else if(count>1800)
    {
        counter.style.color="#e37400";
    }
    else
    {
        counter.style.color="#5f6368";
    }
}


async function generateReply(emailContent, tone, language) {
    const response = await fetch("http://localhost:9191/api/email/generate",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify
            ({
                emailContent,
                tone,
                language,
                maxLength: 2000,
                targetLanguage:language
            })
        });

    if(!response.ok)
        {
            throw new Error(`API request failed: ${response.statusText}`);
        }

    return response.text();
}

function createActionButtons(generatedText, composeBox, charCounter, aiButton) {
    const actionContainer = document.createElement("div");
    actionContainer.style.display = "flex";
    actionContainer.style.alignItems = "center";
    actionContainer.style.marginTop = "8px";
    actionContainer.style.gap = "8px";

    const acceptButton = document.createElement("button");
    acceptButton.textContent = "Accept";
    acceptButton.style.padding = "6px 16px";
    acceptButton.style.borderRadius = "4px";
    acceptButton.style.backgroundColor = "#1e8e3e";
    acceptButton.style.color = "white";
    acceptButton.style.border = "none";
    acceptButton.style.cursor = "pointer";
    acceptButton.style.fontWeight = "500";
    acceptButton.style.fontSize = "14px";
    acceptButton.style.transition = "background-color 0.2s";

    const rejectButton = document.createElement("button");
    rejectButton.textContent = "Reject";
    rejectButton.style.padding = "6px 16px";
    rejectButton.style.borderRadius = "4px";
    rejectButton.style.backgroundColor = "#d93025";
    rejectButton.style.color = "white";
    rejectButton.style.border = "none";
    rejectButton.style.cursor = "pointer";
    rejectButton.style.fontWeight = "500";
    rejectButton.style.fontSize = "14px";
    rejectButton.style.transition = "background-color 0.2s";

    acceptButton.addEventListener("mouseover", () => {
        acceptButton.style.backgroundColor = "#137333";
    });
    acceptButton.addEventListener("mouseout", () => {
        acceptButton.style.backgroundColor = "#1e8e3e";
    });

    rejectButton.addEventListener("mouseover", () => {
        rejectButton.style.backgroundColor = "#b31412";
    });
    rejectButton.addEventListener("mouseout", () => {
        rejectButton.style.backgroundColor = "#d93025";
    });

    acceptButton.addEventListener("click", () => {
        if (composeBox) {
            composeBox.innerHTML = generatedText;
            updateCharacterCount(composeBox, charCounter);
            showNotification("Reply accepted!");
        }
        actionContainer.remove();
        aiButton.disabled = false;
    });

    rejectButton.addEventListener("click", () => {
        if (composeBox) {
            composeBox.innerHTML = "";
            updateCharacterCount(composeBox, charCounter);
        }
        actionContainer.remove();
        aiButton.disabled = false;
        showNotification("Reply rejected. Generate a new one!", true);
    });

    actionContainer.appendChild(acceptButton);
    actionContainer.appendChild(rejectButton);

    return actionContainer;
}

async function generateReply(emailContent, tone, language)
{
    const response = await fetch("http://localhost:9191/api/email/generate",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify
            ({
                emailContent,
                tone,
                language,
                maxLength: 2000,
                targetLanguage: language,
                enforceLanguage: true
            })
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.text();
}

function createActionButtons(generatedText, composeBox, charCounter, aiButton) {
    const actionContainer = document.createElement("div");
    actionContainer.style.display = "flex";
    actionContainer.style.alignItems = "center";
    actionContainer.style.gap = "8px";
    actionContainer.style.marginTop = "12px";
    actionContainer.style.marginLeft = "0"; //->>>L
    actionContainer.style.position = "relative";
    actionContainer.style.zIndex = "1";

    const buttonStyles = {
        padding: "8px 20px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "14px",
        transition: "all 0.2s ease",
        position: "relative",
        zIndex: "1",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        height: "36px",
        minWidth: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        webkitUserSelect: "none"
    };

    const acceptButton = document.createElement("button");
    Object.assign(acceptButton.style, buttonStyles);
    acceptButton.textContent = "Accept";
    acceptButton.style.backgroundColor = "#1e8e3e";
    acceptButton.style.color = "white";

    const rejectButton = document.createElement("button");
    Object.assign(rejectButton.style, buttonStyles);
    rejectButton.textContent = "Reject";
    rejectButton.style.backgroundColor = "#d93025";
    rejectButton.style.color = "white";

    const hoverEffects = (button, defaultColor, hoverColor) => {
        button.addEventListener("mouseover", () => {
            button.style.backgroundColor = hoverColor;
            button.style.boxShadow = "0 2px 4px rgba(0,0,0,0.15)";
        });
        button.addEventListener("mouseout", () => {
            button.style.backgroundColor = defaultColor;
            button.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";
        });
    };

    hoverEffects(acceptButton, "#1e8e3e", "#137333");
    hoverEffects(rejectButton, "#d93025", "#b31412");

    acceptButton.addEventListener("click", () => {
        if (composeBox) {
            composeBox.innerHTML = generatedText;
            updateCharacterCount(composeBox, charCounter);
            showNotification("Reply accepted!");
        }
        actionContainer.remove();
        aiButton.disabled = false;
    });

    rejectButton.addEventListener("click",()=>
        {
        if (composeBox) {
            composeBox.innerHTML = "";
            updateCharacterCount(composeBox, charCounter);
        }
        actionContainer.remove();
        aiButton.disabled = false;
        showNotification("Reply rejected. Generate a new one!", true);
    });

    actionContainer.appendChild(acceptButton);
    actionContainer.appendChild(rejectButton);

    return actionContainer;
}

// function injectButton() {
//     const existingButton = document.querySelector('.ai-reply-button');
//     if (existingButton) existingButton.remove();

//     const toolbar = findComposeToolbar();
//     if (!toolbar) {
//         console.log("Toolbar not found");
//         return;
//     }

//     const container = document.createElement("div");
//     container.style.display = "flex";
//     container.style.flexDirection = "column";
//     container.style.padding = "12px";
//     container.style.backgroundColor = "#f8f9fa";
//     container.style.margin = "8px 0";
//     container.style.borderRadius = "8px";
//     container.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
//     container.style.width = "100%";

//     const controlsContainer = document.createElement("div");
//     controlsContainer.style.display = "flex";
//     controlsContainer.style.alignItems = "center";
//     controlsContainer.style.gap = "12px";
//     controlsContainer.style.width = "100%";
//     controlsContainer.style.position = "relative";
//     controlsContainer.style.zIndex = "1";

//     const buttonContainer = document.createElement("div");
//     buttonContainer.style.display = "flex";
//     buttonContainer.style.gap = "12px";
//     buttonContainer.style.alignItems = "center";

//     const button = createAIButton();
//     const toneSelector = createToneSelector();
//     const languageSelector = createLanguageSelector();
//     const charCounter = createCharacterCounter();

//     button.style.minWidth = "120px";
//     button.style.height = "36px";
//     button.style.display = "flex";
//     button.style.alignItems = "center";
//     button.style.justifyContent = "center";

//     button.addEventListener("click", async () => {
//         if (button.disabled) return;

//         try {
//             button.disabled = true;
//             button.innerHTML = "Generating reply...";
//             const spinner = createLoadingSpinner();
//             button.appendChild(spinner);

//             const emailContent = getEmailContent();
//             if (!emailContent) {
//                 throw new Error("No email content found");
//             }

//             const generatedReply = await generateReply(
//                 emailContent,
//                 toneSelector.querySelector("select").value,
//                 languageSelector.querySelector("select").value
//             );

//             const composeBox = document.querySelector("[role='textbox'][g_editable='true']");
//             if (composeBox) {
//                 composeBox.innerHTML = generatedReply;
//                 updateCharacterCount(composeBox, charCounter);
                
//                 const actionButtons = createActionButtons(
//                     generatedReply, 
//                     composeBox, 
//                     charCounter, 
//                     button
//                 );

//                 // Remove any existing action buttons
//                 const existingActionButtons = container.querySelector('.action-buttons-container');
//                 if (existingActionButtons) {
//                     existingActionButtons.remove();
//                 }

//                 // Add new action buttons
//                 const actionButtonsContainer = document.createElement("div");
//                 actionButtonsContainer.className = 'action-buttons-container';
//                 actionButtonsContainer.style.display = "flex";
//                 actionButtonsContainer.style.gap = "8px";
//                 actionButtonsContainer.style.marginTop = "12px";
//                 actionButtonsContainer.appendChild(actionButtons);
//                 container.appendChild(actionButtonsContainer);
//             } else {
//                 throw new Error("Compose box not found");
//             }
//         } catch (error) {
//             console.error("Error generating AI reply:", error);
//             showNotification(error.message || "Failed to generate AI reply", true);
//             button.disabled = false;
//         } finally {
//             const spinner = button.querySelector('.ai-spinner');
//             if (spinner) spinner.remove();
//             button.innerHTML = "Generate AI Reply";
//         }
//     });

//     buttonContainer.appendChild(button);
//     buttonContainer.appendChild(toneSelector);
//     buttonContainer.appendChild(languageSelector);
//     buttonContainer.appendChild(charCounter);

//     controlsContainer.appendChild(buttonContainer);
//     container.appendChild(controlsContainer);
//     toolbar.insertBefore(container, toolbar.firstChild);

//     const composeBox = document.querySelector("[role='textbox'][g_editable='true']");
//     if (composeBox) {
//         composeBox.addEventListener("input", () => updateCharacterCount(composeBox, charCounter));
//         updateCharacterCount(composeBox, charCounter);
//     }
// }

// function createActionButtons(generatedText, composeBox, charCounter, aiButton) {
//     const actionContainer = document.createElement("div");
//     actionContainer.style.display = "flex";
//     actionContainer.style.gap = "8px";
//     actionContainer.style.position = "relative";
//     actionContainer.style.zIndex = "1";

//     const buttonStyles = {
//         padding: "8px 20px",
//         borderRadius: "4px",
//         border: "none",
//         cursor: "pointer",
//         fontWeight: "500",
//         fontSize: "14px",
//         transition: "all 0.2s ease",
//         position: "relative",
//         zIndex: "1",
//         boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
//         height: "36px",
//         minWidth: "100px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//     };

//     const acceptButton = document.createElement("button");
//     Object.assign(acceptButton.style, buttonStyles);
//     acceptButton.textContent = "Accept";
//     acceptButton.style.backgroundColor = "#1e8e3e";
//     acceptButton.style.color = "white";

//     const rejectButton = document.createElement("button");
//     Object.assign(rejectButton.style, buttonStyles);
//     rejectButton.textContent = "Reject";
//     rejectButton.style.backgroundColor = "#d93025";
//     rejectButton.style.color = "white";

//     const hoverEffects = (button, defaultColor, hoverColor) => {
//         button.addEventListener("mouseover", () => {
//             button.style.backgroundColor = hoverColor;
//             button.style.boxShadow = "0 2px 4px rgba(0,0,0,0.15)";
//         });
//         button.addEventListener("mouseout", () => {
//             button.style.backgroundColor = defaultColor;
//             button.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";
//         });
//     };

//     hoverEffects(acceptButton, "#1e8e3e", "#137333");
//     hoverEffects(rejectButton, "#d93025", "#b31412");

//     acceptButton.addEventListener("click", () => {
//         if (composeBox) {
//             composeBox.innerHTML = generatedText;
//             updateCharacterCount(composeBox, charCounter);
//             showNotification("Reply accepted!");
//         }
//         actionContainer.remove();
//         aiButton.disabled = false;
//     });

//     rejectButton.addEventListener("click", () => {
//         if (composeBox) {
//             composeBox.innerHTML = "";
//             updateCharacterCount(composeBox, charCounter);
//         }
//         actionContainer.remove();
//         aiButton.disabled = false;
//         showNotification("Reply rejected. Generate a new one!", true);
//     });

//     actionContainer.appendChild(acceptButton);
//     actionContainer.appendChild(rejectButton);

//     return actionContainer;
// }

// // Rest of the code remains the same





function injectButton(){
    const existingButton=document.querySelector('.ai-reply-button');
    if(existingButton)existingButton.remove();

    const toolbar=findComposeToolbar();
    if(!toolbar){
        console.log("Toolbar not found");
        return;
    }

    const container=document.createElement("div");
    container.style.display="flex";
    container.style.flexDirection="column";
    container.style.padding="12px";
    container.style.backgroundColor="#f8f9fa";
    container.style.margin="8px 0";
    container.style.borderRadius="8px";
    container.style.boxShadow="0 1px 3px rgba(0,0,0,0.1)";
    container.style.width="100%";

    const controlsContainer=document.createElement("div");
    controlsContainer.style.display="flex";
    controlsContainer.style.alignItems="center";
    controlsContainer.style.gap="12px";
    controlsContainer.style.width="100%";
    controlsContainer.style.position="relative";
    controlsContainer.style.zIndex="1";

    const buttonContainer=document.createElement("div");
    buttonContainer.style.display="flex";
    buttonContainer.style.gap="12px";
    buttonContainer.style.alignItems="center";

    const button=createAIButton();
    const toneSelector=createToneSelector();
    const languageSelector=createLanguageSelector();
    const charCounter=createCharacterCounter();

    button.style.minWidth="120px";
    button.style.height="36px";
    button.style.display="flex";
    button.style.alignItems="center";
    button.style.justifyContent="center";

    button.addEventListener("click",async()=>{
        if(button.disabled)return;

        try{
            button.disabled=true;
            button.innerHTML="Generating reply...";
            const spinner=createLoadingSpinner();
            button.appendChild(spinner);

            const emailContent=getEmailContent();
            if(!emailContent){
                throw new Error("No email content found");
            }

            const recipientName=emailContent.split('\n')[0].replace('Dear ','').replace(',','').trim();
            const generatedReply=await generateReply(
                emailContent,
                toneSelector.querySelector("select").value,
                languageSelector.querySelector("select").value
            );

            const composeBox=document.querySelector("[role='textbox'][g_editable='true']");
            if(composeBox){
                const formattedEmail=generatedReply.split('\n').map(line=>{
                    if(line.trim().length>0){
                        return `<div style="margin:0;padding:0;text-align:left;">${line}</div>`;
                    }
                    return '<div style="margin:0;padding:0;height:14px;"></div>';
                }).join('');

                composeBox.innerHTML=formattedEmail;
                updateCharacterCount(composeBox,charCounter);
                
                const actionButtons=createActionButtons(
                    formattedEmail,
                    composeBox,
                    charCounter,
                    button
                );

                const existingActionButtons=container.querySelector('.action-buttons-container');
                if(existingActionButtons){
                    existingActionButtons.remove();
                }

                const actionButtonsContainer=document.createElement("div");
                actionButtonsContainer.className='action-buttons-container';
                actionButtonsContainer.style.display="flex";
                actionButtonsContainer.style.gap="8px";
                actionButtonsContainer.style.marginTop="12px";
                actionButtonsContainer.appendChild(actionButtons);
                container.appendChild(actionButtonsContainer);
            }else{
                throw new Error("Compose box not found");
            }
        }catch(error){
            console.error("Error generating AI reply:",error);
            showNotification(error.message||"Failed to generate AI reply",true);
            button.disabled=false;
        }finally{
            const spinner=button.querySelector('.ai-spinner');
            if(spinner)spinner.remove();
            button.innerHTML="Generate AI Reply";
        }
    });

    buttonContainer.appendChild(button);
    buttonContainer.appendChild(toneSelector);
    buttonContainer.appendChild(languageSelector);
    buttonContainer.appendChild(charCounter);

    controlsContainer.appendChild(buttonContainer);
    container.appendChild(controlsContainer);
    toolbar.insertBefore(container,toolbar.firstChild);

    const composeBox=document.querySelector("[role='textbox'][g_editable='true']");
    if(composeBox){
        composeBox.addEventListener("input",()=>updateCharacterCount(composeBox,charCounter));
        updateCharacterCount(composeBox,charCounter);
    }
}

async function generateReply(emailContent,tone,language)
{
    const response=await fetch("http://localhost:9191/api/email/generate",
        {
            method:"POST",
            headers:
            {
                "Content-Type":"application/json",
            },
            body:JSON.stringify
            ({
                emailContent,
                tone,
                language,
                maxLength:2000,
                targetLanguage:language,
                enforceLanguage:true,
                format:"email"
            })
        });

        if(!response.ok)
        {
            throw new Error(`API request failed: ${response.statusText}`);
        }
    return response.text();
}
// Improved observer with debouncing
let debounceTimeout;
const observer=new MutationObserver((mutations)=>{
    for(const mutation of mutations)
    {
        const addedNodes=Array.from(mutation.addedNodes);
        const hasComposeElements=addedNodes.some(node=>
            node.nodeType===Node.ELEMENT_NODE && 
            (node.matches('.aDh, .btC, [role="dialog"]') || 
             node.querySelector('.aDh, .btC, [role="dialog"]'))
        );
        
        if(hasComposeElements)
        {
            clearTimeout(debounceTimeout);
            debounceTimeout=setTimeout(injectButton,500);
            break;
        }
    }
});

observer.observe(document.body,{childList:true,subtree:true});  