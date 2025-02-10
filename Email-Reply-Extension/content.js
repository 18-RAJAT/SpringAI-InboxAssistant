function createAIButton()
{
    const button=document.createElement("button");
    button.className="ai-reply-button";
    button.style.marginRight="12px";
    button.style.padding="10px 20px";
    button.style.borderRadius="6px";
    button.style.backgroundColor="#1a73e8";
    button.style.color="white";
    button.style.fontWeight="500";
    button.style.fontSize="14px";
    button.style.cursor="pointer";
    button.style.border="none";
    button.style.transition="all 0.2s ease";
    button.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)";
    button.innerHTML="AI Reply";
    button.setAttribute("role","button");
    button.disabled=false;  // Added initial state

    button.addEventListener("mouseover",()=>{
        if(!button.disabled) {
            button.style.backgroundColor="#1557b0";
            button.style.boxShadow="0 2px 4px rgba(0,0,0,0.15)";
        }
    });
    button.addEventListener("mouseout",()=>{
        if(!button.disabled) {
            button.style.backgroundColor="#1a73e8";
            button.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)";
        }
    });

    return button;
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
    spinner.className="ai-spinner";  // Added class for easy removal
    spinner.style.display="inline-block";
    spinner.style.width="16px";
    spinner.style.height="16px";
    spinner.style.marginLeft="8px";
    spinner.style.border="2px solid #ffffff";
    spinner.style.borderRadius="50%";
    spinner.style.borderTopColor="transparent";
    spinner.style.animation="spin 1s linear infinite";

    const style=document.createElement("style");
    style.textContent=`
        @keyframes spin {
            to {transform: rotate(360deg);}
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

async function generateReply(emailContent, tone, language)
{
    const response=await fetch("http://localhost:9191/api/email/generate",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                emailContent,
                tone,
                language,
                maxLength: 2000 
            })
        }
    );

    if(!response.ok)
    {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.text();
}

function injectButton()
{
    const existingButton=document.querySelector('.ai-reply-button');
    if(existingButton)existingButton.remove();

    const toolbar=findComposeToolbar();
    if(!toolbar)
    {
        console.log("Toolbar not found");
        return;
    }

    const container=document.createElement("div");
    container.style.display="flex";
    container.style.alignItems="center";
    container.style.padding="8px";
    container.style.borderRadius="8px";
    container.style.backgroundColor="#f8f9fa";
    container.style.margin="8px 0";

    const button=createAIButton();
    const toneSelector=createToneSelector();
    const languageSelector=createLanguageSelector();
    const charCounter=createCharacterCounter();

    button.addEventListener("click",async()=>{
        if(button.disabled) return;  // Prevent multiple clicks

        try
        {
            button.disabled=true;
            const originalText=button.innerHTML;
            button.innerHTML="Mail is being generated...";
            const spinner=createLoadingSpinner();

            //update 1
            // button.appendChild(spinner);

            const emailContent=getEmailContent();
            if(!emailContent)
            {
                throw new Error("No email content found");
            }

            const generatedReply=await generateReply(
                emailContent,
                toneSelector.querySelector("select").value,
                languageSelector.querySelector("select").value
            );

            const composeBox=document.querySelector("[role='textbox'][g_editable='true']");
            if(composeBox)
            {
                composeBox.focus();
                document.execCommand("insertText",false,generatedReply);
                showNotification("Reply generated successfully!");
                updateCharacterCount(composeBox, charCounter);
            }
            else
            {
                throw new Error("Compose box not found");
            }
        }
        catch(error)
        {
            console.error("Error generating AI reply:", error);
            showNotification(error.message || "Failed to generate AI reply", true);
        }
        finally
        {
            // Remove spinner and restore button
            const spinner=button.querySelector('.ai-spinner');
            if(spinner) spinner.remove();
            button.innerHTML=originalText;
            button.disabled=false;
        }
    });

    container.appendChild(button);
    container.appendChild(toneSelector);
    container.appendChild(languageSelector);
    container.appendChild(charCounter);

    toolbar.insertBefore(container,toolbar.firstChild);

    const composeBox=document.querySelector("[role='textbox'][g_editable='true']");
    if(composeBox)
    {
        composeBox.addEventListener("input",()=>updateCharacterCount(composeBox,charCounter));
        updateCharacterCount(composeBox,charCounter);
    }
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