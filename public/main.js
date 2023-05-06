var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");

Array.from(thumbUp).forEach(function (element) {
  element.addEventListener('click', function () {
    const questions = this.parentNode.parentNode.childNodes[1].innerText
    const job = this.parentNode.parentNode.childNodes[3].innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('jobs', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'questions': questions,
        'job': job,
        'thumbUp': thumbUp
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(thumbDown).forEach(function (element) {
  element.addEventListener('click', function () {
    const questions = this.parentNode.parentNode.childNodes[1].innerText
    const job = this.parentNode.parentNode.childNodes[3].innerText
    const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('jobs/thumbDown', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'questions': questions,
        'job': job,
        'thumbDown': thumbDown
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function (e) {
    const _id = e.target.dataset.id
    console.log(_id)
    fetch('jobs', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        '_id': _id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
