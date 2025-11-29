import './App.css';

import React, { Component, useState } from 'react'
import Myheader from './component/Myheader';
import Mynav from './component/Mynav';
import ReadArticle from './component/ReadArticle';
import CreateArticle from './component/CreateArticle';
import UpdateArticle from './component/UpdateArticle';



const App = ()=>{
  //state에 들어가지 않거나 변경되지 않는 변수
  let max_menu_id = 3;
  let welcome = {
    title:'Welcome',
    desc:'Welcome to FrontEnd'
  };
  let subject = {
    title : "프론트엔드 개발자 역량" ,
    desc : "기본언어인 html, css, javascript부터 학습합니다. "
  };
  
  //state 선언
  const [mode, setMode] = useState('welcome');
  //mode의 초기값은 welcome, 변경 시 setMode 함수 사용
  const [selected_id, setSelectedId] = useState(2);
  const [menus, setMenus] = useState(
    [
      {id:1, title: 'UI/UX 개발', desc: '사용자 인터페이스와 사용자가 느끼는 총체적 경험을 개발'},
      {id:2, title: '재사용이 가능한 UI 개발', desc: '자바스크립트 프레임워크 이용'},
      {id:3, title: '애니메이션 구현', desc: '다양한 효과의 애니메이션 구현'}
    ]
  );

  //선택된 article의 id를 통해 해당 data 리턴
  const getReadArticle = () => {
    let idx = menus.findIndex(item=>(item.id === selected_id))
    let data = menus[idx];
    return data;
  };

  const getArticles=()=>{
    let _title, _desc, _article = null;
    if(mode === 'welcome'){
      _title = welcome.title;
      _desc = welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc} mode={mode}></ReadArticle>
    } else if (mode === 'read'){
      let _data = getReadArticle();

      _article = <ReadArticle title={_data.title} desc={_data.desc} onChangeMode={(_mode)=>{
        //delete 버튼 눌렀을 경우
        if(_mode === 'delete'){
          if(window.confirm('정말 삭제할까요?')){
            let _menus = Array.from(menus);
            let idx = _menus.findIndex(item=>(item.id === selected_id));
            _menus.splice(idx,1);

            setMode('welcome');
            setMenus(_menus);
          }
        }
          setMode(_mode);

        }}></ReadArticle>
    } else if (mode === 'create'){
      _article = <CreateArticle onSubmit={(_title,_desc)=>{
        console.log(_title,_desc);
        max_menu_id += 1;
        let _menus = menus.concat(
          {id:max_menu_id, title: _title, desc: _desc}
        )
        setMenus(_menus);
        setMode('read');
        setSelectedId(max_menu_id);
        
      }}></CreateArticle>
    } else if (mode === 'update'){
      let _content = getReadArticle();

      _article = <UpdateArticle data={_content} onSubmit={(_id, _title, _desc)=>{
        
        let _menus = Array.from(menus);
        _menus.forEach((item,index)=>{
          if(item.id === _id){
            _menus[index] = {id:_id, title:_title, desc:_desc}
          }
        })
        
        setMenus(_menus);
        setMode('read');
        
      }}></UpdateArticle>
    }
    return _article;
  };




  return(
    <div className='App'>

    <Myheader 
      title={subject.title}
      desc={subject.desc}
      onChangeMode = {()=>{
        setMode('welcome');
      }}>
    </Myheader>
    <Mynav data={menus} onChangePage={(id) =>{
      setMode('read');
      setSelectedId(id);
    }}></Mynav>

    {getArticles()}

    <hr/>
    <div className='menu'>
      <button type='button' className='primary' onClick={()=>{
        setMode('create');
      }}>
        Create task
      </button>
      </div>
    </div>
  )
}





export default App;
