import React from 'react';

class App extends React.Component {
   constructor() {
      super();
		
      this.state = {
         data:[
            
            
            {
                prefix:' ',
                firstName: 'Alfred',
                lastName: 'Hitchcock',
                id: 'A9'
             },
             {
                 prefix:'| ',
                 firstName: 'Cary',
                 lastName: 'Grant',
                 id: 'A9'
             },
             {
                 prefix:'| | \-',
                 firstName: 'Peter',
                 lastName: 'Lorre',
                 id: 'A6'
             },
            {
                prefix:'| | \-',
                firtsName:'Toshiro',
                lastName:'Mifune',
                id:'A7'
            },
            {
                prefix:'| |',
                firstName:'Hedy',
                lastName:'Lamarr', 
                id:'A6'
            },
            {
                prefix:'| | | \-',
                firstName:'Marie', 
                lastName:'Dressler',
                id: 'A6'
            },
            {
                prefix:'| | | ',
                firstName:'Yul', 
                lastName: 'Brynner',
                id: 'A6'
            },
            {
                prefix: '| | | | \-',
                firstName: 'Waheeda',
                lastName: 'Rehman', 
                id: 'A5'
            },
            {
                prefix:'| | | | ',
                firstName: 'Robert', 
                lastName: 'Donat', 
                id: 'A4'
            },
            {
                prefix: '| | | | | \-',
                firstName: 'Lionel', 
                lastName: 'Barrymore', 
                id: 'A3'
            },
            {
                prefix: '| | | \-',
                firstName: 'Meena', 
                lastName: 'Kumari',
                id: 'A1'
            },
            {
                prefix: '| | | \-',
                firstName: 'Hema', 
                lastName: 'Malini', 
                id: 'A1'
            },
            {
                prefix: '| ',
                firstName: 'Grace', 
                lastName: 'Kelly', 
                id:'A8'
            },
            {
                prefix:'| | \-',
                firstName: 'Omar', 
                lastName: 'Sharif', 
                id: 'A7'
            },
            {
                prefix: '| \-',
                firstName: 'Jean', 
                lastName: 'Harlow',
                id: 'A8'
            },
            {
                prefix: '| ',
                firstName: 'Vivien', 
                lastName: 'Leigh',
                id: 'A8'
            },
            {
                prefix: '| | ',
                firstName: 'Steve',
                lastName: 'McQueen',
                id: 'A7'
            },
            {
                prefix:'| | | \-',
                firstName: 'Montgomery', 
                lastName: 'Clift', 
                id: 'A6'
            },
            {
                prefix: '| | | \-',
                firstName: 'Alain', 
                lastName: 'Delon',
                id: 'A6'
            },
            {
                prefix:'| | | \-',
                firstName: 'Ethel',
                lastName: 'Waters',
                id: 'A6'
            },
            {
                prefix: '| | | \-',
                firstName:'Anna', 
                middleName:'May', 
                lastName: 'Wong',
                id: 'A6'
            },
            {
                prefix: '| | \-',
                firstName: 'Doris', 
                lastName: 'Day', 
                id: 'A7'
            },
            {
                prefix:'| | \-',
                firstName: 'Carole', 
                lastName: 'Lombard',
                id: 'A6'
            },
            {
                prefix:'| | \-',
                firstName: 'Sidney', 
                lastName: 'Poitier',
                id: 'A'}, 
         ]
      }
   }
   render() {
      return (
         <div>
            <div>
               {this.state.data.map((dynamicComponent, i) => <Content 
                  key = {i} componentData = {dynamicComponent}/>)}
            </div>
         </div>
      );
   }
}
class Content extends React.Component {
   render() {
      return (
         <div>
            <span>{this.props.componentData.prefix}</span> 
            <span>{this.props.componentData.firstName} </span>
            {this.props.componentData.middleName === true &&
                <span>{this.props.componentData.middleName}</span>
            }
            <span>{this.props.componentData.latName} </span>
            <span>({this.props.componentData.id})</span><br />
         </div>
      );
   }
}
export default App;