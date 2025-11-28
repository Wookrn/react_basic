import React, { Component } from 'react'


class Mynav extends Component{
  // component가 변경되었는지 확인 (기본 return true)
  shouldComponentUpdate(newProps, newState){
    console.log('shouldComponentUpdate 작동');
    if(this.props.data === newProps.data){
      //변경전 값 === 변경된 값일 경우 리렌더링X
      return false;
    }
    return true;
  }

  render(){
    console.log('Mynav 실행');
    let lists = [];
    let data = this.props.data;
    

    data.forEach(item=>{
        lists.push(
            <li key={item.id}>
            <a 
              href="/"
              onClick={e=>{
                e.preventDefault();
                  this.props.onChangePage(item.id);
              }}
            >{item.title}
            </a></li>
        );
    });

    return(
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    )
  }
}


export default Mynav;
