import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth'
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [modelList, setModelList] = useState([]);

  const [newModelName, setnewModelName] = useState('');
  const [newInputType, setnewInputType] = useState('');
  const [newOutputType, setnewOutputType] = useState('');
  const [newFineTuneStatus, setnewFineTuneStatus] = useState(false);
  const [updatedName, setUpdatedName] = useState('')
  const [newFile, setnewFile] = useState(null)

  const modelCollectionRef =  collection(db, 'models');

  const getModelList = async () => {
    try {
    const data = await getDocs(modelCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    console.log(filteredData);
    setModelList(filteredData);
  } catch(err) {
    console.log(err)
  }
  };

  useEffect(() =>{
    getModelList()
  }, []);

  const deleteModel = async (id) => {
    const modelDoc = doc(db, 'models', id);
    try{
    await deleteDoc(modelDoc);

    getModelList()

    } catch(err){
      console.log(err)
    }
  };

  const updateModelName = async (id) => {
    const modelDoc = doc(db, 'models', id);
    try{
    await updateDoc(modelDoc, {Name: updatedName});

    getModelList()
    } catch(err){
      console.log(err)
    }
  };

  const uploadFile = async () => {
    if (newFile ==  null) return;
    const ImageFolderref = ref(storage, `ImageFolder/${newFile.name}`);
    try{
    await uploadBytes(ImageFolderref, newFile);
    }catch(err){
      console.log(err)
    }
  } 

  const onAddModel = async () => {
    try{
    await addDoc(modelCollectionRef, {
      Name: newModelName, FineTuneStatus: newFineTuneStatus, InputType: newInputType, OutputType: newOutputType, userID: auth?.currentUser?.uid,  });

      getModelList()

    } catch(err){
      console.log(err)
    }
  };

  return (
    <div className="App">
      <Auth/>

      <div>
        <input placeholder = 'Model name...' onChange = {(e) => setnewModelName(e.target.value)}/>
        <input placeholder = 'Input type...' onChange = {(e) => setnewInputType(e.target.value)}/>
        <input placeholder = 'Output type...' onChange = {(e) => setnewOutputType(e.target.value)}/>
        <input type ='checkbox' onChange = {(e) => setnewFineTuneStatus(e.target.checked)}/>
        <label> Fine-tuning status</label>
        <button onClick = {onAddModel}>Add model</button>

      </div>

      <div>
        {modelList.map((model) => (
          <div key={model.id}>
            <h1 style = {{color: model.FineTuneStatus ? 'green' : 'red'}}> {model.Name} </h1>
            <p> FineTuneStatus: {model.FineTuneStatus.toString()}</p>
            <button onClick = {() => deleteModel(model.id)}>Delete model</button>

            <input placeholder = 'new name...' onChange = {(e) => setUpdatedName(e.target.value)}/>
            <button onClick = {() => updateModelName(model.id)}> Update Model Name </button>

          </div> 
        ))}
      </div>

      <div>
        <input type='file' onChange = {(e) => setnewFile(e.target.files[0])}/>
        <button onClick = {uploadFile}> Upload File</button>
      </div>


    </div>


  );
}

export default App;
