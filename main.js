// init speech api
let synth = window.speechSynthesis;

let textInput = document.querySelector('#TypeHere')
let voiceSelect = document.querySelector('#voiceSelect')
let speakOut = document.querySelector('.speak')

let pitch = document.querySelector('#pitch')
let pitchValue = document.querySelector('.pitch-value')
let SpeechSpeed = document.querySelector('#SpeechSpeed')
let SpeechSpeedValue = document.querySelector('.SpeechSpeed-value')
let Amplitude = document.querySelector('#Amplitude')
let AmplitudeValue = document.querySelector('.Amplitude-value')
let Frequency = document.querySelector('#Frenquency')
let FrequencyValue = document.querySelector('.Frequency-value')

//init voices 
let voices = []
let getVoices = () => {
    voices = synth.getVoices()
    // console.log(voices)

    //looping and creating voices option for each one
    voices.forEach(voice => {
        //creating options
        let option = document.createElement('option')

        // filling option with voice and language
        option.textContent = voice.name + '(' + voice.lang + ')';

        //set needed option attributes
        option.setAttribute('date-lang', voice.lang)
        option.setAttribute('data-name', voice.name)
        voiceSelect.appendChild(option)
    })
}

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices
}

//speak now
let speak = () => {
    // checking if speaking
    if (synth.speaking) {
        console.err('In working...');
        return;
    }

    if (textInput.value !== '') {
        //get speak text
        let speakText = new SpeechSynthesisUtterance(textInput.value)

        //speak end
        speakText.onend = e => {
            console.log('process completed... ')
        }

        //speak error
        speakText.onerror = e => {
            console.error('something went wrong.....')
        }

        // selected voice 
        let selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

        //loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice
            }
        })
        // set up changes
        // speakText.SpeechSpeed = SpeechSpeed.value;
        // speakText.pitch = pitch.value;

        //speak
        synth.speak(speakText)
    }
}

speakOut.addEventListener('click', e => {
    e.preventDefault()
    speak()
    textInput.blur()
})

// Rate value change
// SpeechSpeed.addEventListener('change', e => (SpeechSpeedValue.textContent = SpeechSpeed.value));

// Pitch value change
// pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

//speak when the language is changed
voiceSelect.addEventListener('change', e => speak())