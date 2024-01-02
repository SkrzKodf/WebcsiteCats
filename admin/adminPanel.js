

fetch('/getForm') 
            .then(response => response.json())
            .then(data => {
                const dataContainer = document.getElementById('data-container');
                data.forEach(item => {
                    let listItem = document.createElement('div');
                    listItem.className='formBlock';
                    listItem.id=item._id+item._id;

                    listItem.innerHTML = `<div>
                    Имя: ${item.name}<br>Email: ${item.email}<br>
                    Описание: ${item.description}
                    </div>
                    <button class="update" id="${item._id}">Обновить</button>
                    <button class="delete" id="${(item._id).split('').reverse().join('')}">Удалить</button>`;
                    dataContainer.appendChild(listItem);
                    
                    document.getElementById(item._id).addEventListener('click', function() {
                        document.getElementById('overlay').style.cssText="display: block;";
                    });

                    document.getElementById((item._id).split('').reverse().join('')).addEventListener('click', function() {
                        fetch('/deleteForm', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body:JSON.stringify({_id: item._id})
                            })
                        document.getElementById(item._id+item._id).style.cssText='display:none;';
                    });

                });
            })
            .catch(error => {
                console.error('Ошибка загрузки данных:', error);
            });

document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('overlay').style.cssText='display: none';
  });
