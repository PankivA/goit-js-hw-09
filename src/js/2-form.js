const form = document.querySelector('.feedback-form');

const LS_KEY = 'feedback-form-state';
const formData = {
  email: "",
  message: "",
};

form.addEventListener('input', e => {
    const { name, value } = e.target;
    formData[name] = value.trim();

    saveToLS(LS_KEY, formData);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
        alert('Fill please all fields');
        return;
    }
    console.log(formData);
    localStorage.removeItem(LS_KEY);
    formData.email = "";
    formData.message = "";
    form.reset();
})

    const data = loadFromLS(LS_KEY);
    if (data) {
        formData.email = data.email || "";
        formData.message = data.message || "";

        form.elements.email.value = formData.email;
        form.elements.message.value = formData.message;
}

function saveToLS(key, value) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
}

function loadFromLS(key) {
    const json = localStorage.getItem(key);
    try {
        const data = JSON.parse(json);
        if (data) {
            return data;
        }
        
    } catch (err) {
        console.log(err);
    }
}