
function lightCell(prob){
    if(Math.random() < prob){
      return "t"
    }else{
      return "f"
    }
  };

  export {lightCell};