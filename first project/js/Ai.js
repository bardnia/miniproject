const $input = document.querySelector('input')
const $button = document.querySelector("[type='submit']")
const $buttongo = document.querySelector('button.load')
const $button_clean = document.querySelector('button.clean')
const $next = document.querySelector('.next')
const $back = document.querySelector('.back')

const $answer = document.querySelector('.answer')
const $print = document.querySelector("#print");
const $mini = document.querySelector("#mini_main");
const $tema = document.getElementsByName("tema");
const $pageset = document.querySelector("body");

const pagetema = window.localStorage.getItem('tema');


$back.addEventListener ('click', e => {
    window.location.href="../html/index.html"
})

$next.addEventListener ('click', e => {
    window.location.href="../html/002.html"
})

$buttongo.addEventListener('click', e => {
    e.preventDefault()
    $mini.setAttribute("style", "display:none;");
    $print.setAttribute("style", "display:block;");
})

const data = []
if (pagetema == '웹툰') {
    data.push({
        "role": "system",
        "content": "assistant는 웹툰을 잘 아는 전문가이다."
    })
} else if (pagetema == '웹소설') {
    data.push({
        "role": "system",
        "content": "assistant는 웹소설을 잘 아는 전문가이다."
    })
} else if (pagetema == '영화') {
    data.push({
        "role": "system",
        "content": "assistant는 영화을 잘 아는 전문가이다."
    })
} else if (pagetema == '드라마') {
    data.push({
        "role": "system",
        "content": "assistant는 드라마을 잘 아는 전문가이다."
    })
}

const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`





$button.addEventListener("click", async function (e) {
    e.preventDefault();
    let selects = []; //체크박스 체크된 내용이 담길 예정
    gettema($tema, selects);
    const contents = databox($textarea.value, selects);

    data.push({
        role: "user",
        content: contents,
    });
    
    $print.setAttribute("style", "display:block;");
    $mini.setAttribute("style", "display:none;");
    
    let result = await chatGPTAPI();
    result = result.replaceAll("\n", "<br>");
    console.log(result);
    
    //데이터정제과정//
    let [title, ingredient] = result.split("재료:");
    
    if (title.indexOf(":") !== -1) {
        title = title.split(": ")[1];
    }
    title = title.replaceAll("<br>", "");
    
    let recipe;
    [ingredient, recipe] = ingredient.split("요리방법:<br>");
    
    if (ingredient.includes("<br>-")) {
        ingredient = ingredient.replace("<br>-", "");
        ingredient = ingredient.replaceAll("<br>-", ", ");
    }
    if (ingredient.includes("<br><br>")) {
        ingredient = ingredient.replace("<br><br>", "");
    }
    
    if (recipe.includes("<br><br>")) {
        recipe = recipe.split("<br><br>")[0];
    }
    if ("<br>" === recipe.slice(0, 4)) {
        recipe = recipe.replace("<br>", "");
    }
    recipe = recipe.replaceAll("<br>", "</li><li>");
    recipe = recipe.replace(/\d{1,3}. /g, "");
    
    makeRecipeHTML(title, ingredient, recipe, $answer, true);
    $loading.setAttribute("style", "display:none;");
    $answer.setAttribute("style", "display:flex;");
});

function gettema(inputs, resultArr) {
    inputs.tema((input) => {
        if (input.checked) {
            resultArr.push(input.defaultValue);
        }
    });
}

function databox(tema, selects) {
    let content = ``;
    selects.forEach((select) => {
        if (selects.length === 1) {
        //라디오버튼값만 있음
            content += "";
        } else if (select !== "true" && select !== "false") {
        //체크박스 선택한 내용
            content += select + ", ";
        } else {
            content = content.slice(0, -2);
            content += "만 있어. ";
        }
    });
    content += "을/를 주제로 찾아줘. 제목:, 줄거리: 순서로 알려주고 다른 말은 하지마.";
    return content;
    // ex)  판타지, 로멘스 을/를 주제로한 ${}을/를 찾아줘. 제목:, 줄거리: 순서로 알려주고 다른 말은 하지마.
}

// $button.addEventListener('click', e => {
//     e.preventDefault()
//     const contents = $input.value
//     data.push({
//         "role": "user",
//         "content": contents
//     })
//     $input.value = ''

//     chatGPTAPI()
// })


$button_clean.addEventListener('click', e => {
    e.preventDefault()
    $input.value = ''

    chatGPTAPI_clean()
})

async function chatGPTAPI() {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
      });
      const json = await response.json();
      console.log(json);
      const result = json.choices[0].message.content;
      return result;
    } catch {
        alert("잠시 후 다시 시도해 주십시오.");
      }
}

// function chatGPTAPI() {
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//         redirect: 'follow'
//     })
//     .then(res => res.json())
//     .then(res => {
//         console.log(res)
//         // 답변 온 것을 assistant로 저장
//         $answer.innerHTML = `<p>${res.choices[0].message.content}</p>`
//     })
// }

function chatGPTAPI_clean() {
    $answer.innerHTML = ``
}

