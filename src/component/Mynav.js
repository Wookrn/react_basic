import React, { Component, useEffect, useState } from 'react'

const Mynav = ({data, onChangePage}) =>{
  const [list,setList] = useState([]);
  let lists = [];

  //전달받은 data는 객체라 그대로 list로 사용 불가
  //빈 배열 lists에 하나하나 push하고 list에 state 변경
  const getList = () =>{
    data.forEach(item=>{
    lists.push(
        <li key={item.id}>
        <a 
          href="/"
          onClick={e=>{
            e.preventDefault();
              onChangePage(item.id);
          }}
        >{item.title}
        </a></li>
        );
    });
    setList(lists);
  };

  useEffect(()=>{
      getList();
      console.log('getList 실행');

  },[data]);
  //data가 변경될 경우에만 getList 작동

  return(
    <nav>
      <ul>
        {list}

      </ul>
    </nav>
  )
}

export default Mynav;
