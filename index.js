addAlimentoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = addAlimentoForm.name.value;
    var caloria = addAlimentoForm.caloria.value;
    var descricao = addAlimentoForm.descricao.value;
    var imgFile = addAlimentoForm.img.files[0];

    if (name && descricao && caloria && imgFile) {
        var storageRef = firebase.storage().ref('imagens/' + imgFile.name);
        var uploadTask = storageRef.put(imgFile);

        uploadTask.on('state_changed', function(snapshot) {
            // Você pode usar este código para monitorar o progresso do upload
        }, function(error) {
            // Tratar qualquer erro que ocorra durante o upload
        }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                db.collection("alimentos").add({
                    name: name,
                    caloria: caloria,
                    descricao: descricao,
                    img: downloadURL
                });
                addAlimentoForm.reset();
            });
        });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
