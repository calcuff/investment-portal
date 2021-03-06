import React, { Component } from 'react'
import Title from '../Common/Title'
import Headers from './Headers'
import DataTable from './DataTable'
import data from '../../images/dater.jpg'
import UserProfile from '../Common/UserProfile';
import axios from "axios";
import NavBar from '../Common/NavBar'

export default class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            isLoading: true,
            portfolioData : null,
            queried:false
        }

        this.resetQueryStates = this.resetQueryStates.bind(this)
    }

    onSubmit = async () => {
        const creds = {
            email: UserProfile.getName(),
            password: ''
          };

        console.log("Getting portfolio..", creds)
        const headers = {'Content-Type': 'application/json' }

        axios.get('http://localhost:8080/portfolio/' + creds.email, 
        {headers: headers}).then(response =>{
          this.setState({
            portfolioData: response.data,
            isLoading: false,
            user: creds.email,
            queried: true,
          });
          console.log("The user is ", this.state.user)
          console.log("Got data: ", this.state.portfolioData)
          console.log("Symbol1: ", this.state.portfolioData.data[0].symbol, this.state.portfolioData.data[0].name ); 
        })
        .catch(error => {
            console.log("Error: " + error)
            alert("There was an error getting Portfolio, are you logged in?")
        })
    }

    resetQueryStates(){
        this.setState({
            isLoading: true,
            queried: false
        });
    }

    render() {
        
        if (!this.state.queried){
            this.onSubmit()
        }

        const { isLoading} = this.state;
        if (isLoading) {
            return (
              <div>
                  <NavBar/>
                
              <div className="col">
                Loading...
              </div>
              </div>
            );}
            else { 
        return (
            <React.Fragment>
                <div  style={{ backgroundImage:`url(${data})`, backgroundSize:"cover"}}>
                <NavBar/>
                    <div className="py-5">
                        <div className="container">
                            <Title name="Portfolio"/>
                        </div>
                        <Headers user={this.state.user} portfolioData={this.state.portfolioData}/>
                    </div> 
                    <DataTable portfolioData={this.state.portfolioData} action={this.resetQueryStates} />
                </div>
            </React.Fragment>
        );
            }
        
    }
}