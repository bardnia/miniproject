const $input = document.querySelector('input')
const $button = document.querySelector('button')
const $button_clean = document.querySelector('button.clean')
const $answer = document.querySelector('.answer')

const data = []
data.push({
    "role": "system",
    "content": "assistant는 전문가다."
})

const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`

$button.addEventListener('click', e => {
    e.preventDefault()
    const contents = $input.value
    data.push({
        "role": "user",
        "content": contents
    })
    $input.value = ''

    chatGPTAPI()
})

$button_clean.addEventListener('click', e => {
    e.preventDefault()
    $input.value = ''

    chatGPTAPI_clean()
})

function chatGPTAPI() {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        redirect: 'follow'
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        // 답변 온 것을 assistant로 저장
        $answer.innerHTML = `<p>${res.choices[0].message.content}</p>`
    })
}

function chatGPTAPI_clean() {
    $answer.innerHTML = ``
}