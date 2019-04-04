module.exports=function ValidateFields(fields){
    let missingfields=[];
    Object.keys(fields).map(key=>{
      if(fields[key].length==0){
        missingfields.push(key+" can't be empty!");
      }
    })
  
    if(missingfields.length>0){
      return missingfields;
    }
    else{
      return true;
    }
  }