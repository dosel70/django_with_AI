// 알림 버튼 클릭시 목록 나오기
const announceBtn = document.querySelector('.announce-button-icon')
announceBtn.addEventListener("click", function(e) {
    const container = document.querySelector('.announce-list-container')
    container.classList.toggle('active');
});


// 파일 입력 필드에 변화가 있을 때 실행될 함수
const errorMessage = document.querySelector('div.upload-error')
document.getElementById("file-input").addEventListener('change', function(event) {
    var fileList = document.getElementById('file-list');
    var files = event.target.files;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (file.type.startsWith('image/')) {
            var reader = new FileReader();
            reader.onload = (function(f) {
                return function(e) {
                    var cancelButton = document.createElement('button');
                    cancelButton.textContent = 'X';
                    cancelButton.className = 'cancel-upload';
                    
                    var thumbnail = document.createElement('img');
                    thumbnail.src = e.target.result;
                    thumbnail.alt = 'Thumbnail';
                    thumbnail.style.display = 'block';
                    thumbnail.width = 100;

                    var listItem = document.createElement('li');
                    listItem.appendChild(thumbnail);

                    
                    cancelButton.addEventListener('click', function() {
                        fileList.removeChild(listItem); // 취소된 파일 제거
                    });
                    listItem.appendChild(cancelButton);

                    fileList.appendChild(listItem);
                };
            })(file);
            reader.readAsDataURL(file);
            errorMessage.style.display = 'none'; 
        } else {
            errorMessage.style.display = 'block';  // 이미지 파일이 아닌 경우 에러 메시지 표시
        }
    }
});

// 업로드 취소 버튼에 클릭 이벤트 추가
const cancelBtns = document.querySelectorAll('button.cancel-upload')
cancelBtns.forEach((cancelBtn) => {
    cancelBtn.addEventListener('click', function(e) {
        cancelBtn.parentElement.remove;
    })
})


// 제목 글자수 계산
const input = document.querySelector('.maker-input');
const helperMsg = document.querySelector('.helper-msg');

input.addEventListener('input', function() {
    // input에 입력된 글자 수 계산
    const length = input.value.length;
    
    // 최대 글자 수는 30
    const maxLength = 30;
    
    // 남은 글자 수 계산
    const remaining = maxLength - length;
    
    // helper-msg의 텍스트를 업데이트
    helperMsg.textContent = remaining + '자 남음';
});


// 상세 내용 글자 수 계산
const textarea = document.querySelector('.textarea-input textarea');
const formFieldHelper = document.querySelector('.form-field-helper');

textarea.addEventListener('input', function() {
    // textarea에 입력된 글자 수 계산
    const length = textarea.value.length;

    // 최대 글자 수는 2000
    const maxLength = 2000;

    // 남은 글자 수를 계산합니다.
    const remaining = maxLength - length;

    formFieldHelper.textContent = remaining + '자 남음';
});


textarea.addEventListener('focus', function() {
    // textarea가 focus를 받았을 때 border 색을 변경
    textarea.style.borderColor = '#008243';
});

// 문서 전체에 click 이벤트를 추가합니다.
document.addEventListener('click', function(event) {
    // 클릭된 엘리먼트가 textarea가 아닌 경우에만 실행
    if (!event.target.closest('.textarea-input')) {
        // textarea 외부를 클릭했을 때 textarea의 border 색을 변경
        textarea.style.borderColor = '#dde2e6';
    }
});



const typeBtns = document.querySelectorAll('label.radio')
const activeBtns = document.querySelectorAll('span.radio-icon')
typeBtns.forEach((typeBtn) => {
    typeBtn.addEventListener('click', function(e){
        activeBtns.forEach((activeBtn) => {
            activeBtn.classList.remove('active')
        }) 
        const radioIcon = typeBtn.children[1];
        radioIcon.classList.add('active')
        if(typeBtn.classList[1]) {
            document.querySelector('.section-content.etc').style.display = 'block'
        }else {
            document.querySelector('.section-content.etc').style.display = 'none'
        }
    })
})

function getCSRFToken() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('csrftoken=')) {
            return cookie.split('=')[1];
        }
    }
    return '';
}


const aiBtn = document.querySelector('#aiButton');
const box = document.querySelector('.ai-recommend-container')
const save_btn = document.querySelector('.save-btn');
aiBtn.addEventListener('click', async (e) => {
    const loading = document.getElementById('loading');
    const title = document.querySelector('input[name="community-title"]').value
    const radio_active = document.querySelector('.radio-icon.active').parentElement;
    const inputValue = radio_active.querySelector('input').value;
    const csrfToken = getCSRFToken();
    const result_boxes = document.querySelectorAll('#result1')

    // console.log(title)
    // console.log(inputValue)
    loading.style.display = 'block'
    const response = await fetch("/ai/similar/", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
            title: title,
            radio_active: inputValue

        })
    });
    loading.style.display = 'none';
    box.style.display = 'block';
    const results = await response.json();
    console.log(results);


    result_boxes.forEach((result_box, index)=>{
        result_box.innerHTML = results.similar_communities[index];
        result_box.parentElement.addEventListener('click', (e)=>{
            textarea.innerHTML = ''
            textarea.innerText = results.similar_communities[index];
            box.style.display = 'none'
            save_btn.classList.add('disabled-button')
            save_btn.style.backgroundColor = '#808080'
        })
    })

});

const warning = document.querySelector('.warning')
textarea.addEventListener('keyup', function() {
    //console.log(textarea.value)
    save_btn.classList.remove('disabled-button')
    save_btn.style.backgroundColor = '#008243'
    warning.style.display = 'none'
})

const form = document.getElementById('submit-form')

save_btn.addEventListener('click', (e)=> {
    // console.log('클릭')

    if (save_btn.classList.contains('disabled-button')) {
        e.preventDefault()
        warning.style.display = 'block'
    } else {
        form.submit();
    }
})

