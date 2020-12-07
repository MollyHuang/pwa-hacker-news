// enable offline data
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

// real-time listener
db.collection('recipes').onSnapshot(snapshot => {
  // console.log(snapshot.docChanges());
  snapshot.docChanges().forEach(change => {
    //console.log(change.type, change.doc.id, change.doc.data());
    if (change.type === 'added') {
      // add the document data to the web page
      //console.log("add the document data to the web page --", change.doc.data().title);
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === 'modified') {
      // add the document data to the web page
      console.log("modify the document data to the web page --", change.doc.data().title);
      modifyRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === 'removed') {
      // remove the document data from the web page
      //console.log("remove the document data from the web page -- ", change.doc.data().title);
      removeRecipe(change.doc.id);
    }
  });
});

// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value
  }

  db.collection('recipes').add(recipe)
    .catch(err => console.log(err));

  form.title.value = '';
  form.ingredients.value = '';
});

// remove a recipe
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener("click", evt => {
  //console.log("click", evt);
  if (evt.target.tagName === 'I') {
    const id = evt.target.getAttribute('data-id');
    db.collection('recipes').doc(id).delete();
  }
});

