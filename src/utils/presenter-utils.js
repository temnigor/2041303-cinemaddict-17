
const getNewAllModelCard = (upDateCard, allModelCard)=>{
  const index = allModelCard.findIndex((modelCard)=>modelCard.id === upDateCard.id);
  if (index === -1){
    return allModelCard;
  }
  return [
    ...allModelCard.slice(0,index),
    upDateCard,
    ...allModelCard.slice(index+1)
  ];
};
export {getNewAllModelCard};
