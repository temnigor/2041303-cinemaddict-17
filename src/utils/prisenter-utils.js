
const getNewAllModelCard = (udateCard, allModelCard)=>{
  const index = allModelCard.findIndex((modelCard)=>modelCard.id === udateCard.id);
  if (index === -1){
    return allModelCard;
  }
  return [
    ...allModelCard.slice(0,index),
    udateCard,
    ...allModelCard.slice(index+1)
  ];
};
export {getNewAllModelCard};
