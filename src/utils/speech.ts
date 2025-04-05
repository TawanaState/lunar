export const speechRecognizer = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
if (!speechRecognizer) {
    console.error('Speech recognition not supported in this browser.');
}
window.stt = speechRecognizer;
//speechRecognizer.start();
speechRecognizer.continuous = false;
//speechRecognizer.lang = "en-US";
speechRecognizer.interimResults = false;
speechRecognizer.maxAlteratives = 2;

export function Listen(onresult:any, onend=()=>{}) {
    speechRecognizer.start();
    
    speechRecognizer.onresult = (event:any) => {
        onresult(event.results[0][0].transcript);
        console.log(event.results[0][0]);
    };

    speechRecognizer.onerror = (e:any) => {
        console.log(e);
    }

    speechRecognizer.onspeechend = () => {
        //speechRecognizer.stop();
        onend();
    }
    return speechRecognizer;
}


// SPEECH SYNTHESIS
export const speechSynthesizer = window.speechSynthesis;
window.tts = speechSynthesizer;
export function onVoicesChanged(callback:any) {
    callback(speechSynthesizer.getVoices());
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
            callback(speechSynthesizer.getVoices());
        }
    }
    
}
export function Speak(text = "Hi, I'm Lunar. What can I do for you?", rate = 1, pitch = 1, voice = null) {
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.pitch = pitch;
    utterThis.rate = rate;
    if (voice) {
        utterThis.voice = voice;
    }
    speechRecognizer.stop();
    speechSynthesizer.speak(utterThis);
}

