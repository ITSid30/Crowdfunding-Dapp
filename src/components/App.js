import React, { useState, useEffect, Component } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Navbar from './navbar.js'
import Web3 from 'web3';
import CrowdFunding from '../truffle_abis/CrowdFunding.json'
import Main from './Main.js';
import ParticleSettings from './ParticleSettings'

//import CreateRequest from './CreateRequest'

class App extends Component {
    // manager = null
    
    
    // const [txs, setTxs] = useState([]);
    // useEffect = async (() => {
    //     if (contractInfo.address !== "-") {
    //       const provider = new ethers.providers.Web3Provider(window.ethereum);
    //       const erc20 = new ethers.Contract(
    //         contractInfo.address,
    //         erc20abi,
    //         provider
    //       );
    
    //       erc20.on("Transfer", (from, to, amount, event) => {
    //         console.log({ from, to, amount, event });
    
    //         setTxs((currentTxs) => [
    //           ...currentTxs,
    //           {
    //             txHash: event.transactionHash,
    //             from,
    //             to,
    //             amount: String(amount)
    //           }
    //         ]);
    //       });
    //       setContractListened(erc20);
    
    //       return () => {
    //         contractListened.removeAllListeners();
    //       };
    //     }
    //   }, [contractInfo.address]);
    ID = null;
    

        // mount the web3 before even rendering - react lifecycle
    async UNSAFE_componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            // await window.web3.enable()
        } else {
            window.alert('No ethereum Browser detected! You can check out MetaMask! ')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        var account = await web3.eth.getAccounts()            //eth_requestAccounts()
        this.setState({account: account[0]})
        this.manager = account
        //console.log(account)

        const networkId = await web3.eth.net.getId()
        console.log(networkId, 'Network ID')
        this.setState({ID: networkId});

        // Load CrowdFunding Contract 
        const crowdfundingdata = CrowdFunding.networks[networkId];
        //console.log(crowdfundingdata.address)
        if(crowdfundingdata) {
            const crowdFunding = new web3.eth.Contract(CrowdFunding.abi, crowdfundingdata.address);
            console.log(crowdfundingdata.address);
            this.setState({contract : crowdFunding.address});
            this.setState({crowdFunding})
            //let manager = this.state.crowdFunding.methods.manager.call();
            //this.setState({manager:manager[0]})
            //console.log(manager[0])
            let crowdFundingBalance = await crowdFunding.methods.getContractBalance().call()
            let target = await crowdFunding.methods.getTarget().call()
            this.setState({crowdFundingBalance: crowdFundingBalance.toString()})
            this.setState({target: target.toString()})
            console.log({balance: crowdFundingBalance})
            console.log({target: target});
        } else {
            window.alert('Error: CrowdFunding Contract not Deployed - no detected network !')
        }

        this.setState({loading: false})
    }
    

    createRequest = (desc, address, amount) => {
        this.setState({loading: true})
        this.state.crowdFunding.methods.createRequests(desc, address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading:false})
        })
    }

    setEth = (target, time) => {
        console.log(target, time)
        this.setState({loading: true})
        this.state.crowdFunding.methods.setEth(target, time).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({target: target})
            this.setState({loading:false})
        })
    }

    // original
    // sendEth = (fund) => {
    //     this.setState({loading: true})
    //     this.state.crowdFunding.methods.senEth(fund).send({from: this.state.account}).on('transactionHash', (hash) => {
    //         // this.setState({noContributors: noContributors+1})
    //         this.setState({loading:false})
    //     })
    // }
    // sendEth = (fund) => {
    //     this.setState({loading: true})
    //     const crowdfundingdata = CrowdFunding.networks[this.state.ID];
    //     const contract = crowdfundingdata.address;
    //     this.state.crowdFunding.methods.senEth(contract, fund).send({from: this.state.account}).on('transactionHash', (hash) => {
    //         // this.setState({noContributors: noContributors+1})
    //         this.setState({loading:false})
    //     })
    // }
    fundSend = (fund) => {
        this.setState({loading: true})
        this.state.crowdFunding.methods.fundContract().send({from: this.state.account, value:fund}).on('transactionHash', (hash) => {
            // this.setState({noContributors: noContributors+1})
            this.setState({loading:false})
        })
        
    }

    vote = (requestno) => {
        //if(this.state.account != this.manager) window.alert("You a contributor Address");    // IMPORTANT Condition : for selecting Accounts ..
        //else {
            this.setState({loading: true})   
            console.log("Hii asdad")
            this.state.crowdFunding.methods.voteRequest(requestno)
            // let req = this.state.crowdFunding.methods.returnRequest(requestno)
            // this.setState({noOfVoters: req.noOfVoters.toString()})
            // console.log({NoVoters : this.state.noOfVoters})
            window.alert("You have voted !");
            this.setState({loading:false})
        //}
        
    }

    makepay = (requestno) => {
        this.setState({loading: true})
        const crowdfundingdata = CrowdFunding.networks[this.state.ID];
        //const contract = crowdfundingdata.address;
        this.state.crowdFunding.methods.makePayment(requestno).send({from: this.state.manager}).on('transactionHash', (hash) => {
            this.setState({loading:false})
        })
        //this.state.crowdFunding.methods.makePayment(requestno)
        this.setState({loading:false})
        
    };


    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            contract: '',
            crowdFunding: {},
            crowdFundingBalance: '0',
            target: '0',
            manager: '',
            deadline: '0',
            // noContributors: 0,
            loading: true
        }
    }

    // Our React Code goes in Here !
    render () {
        let content
        {this.state.loading ? content = 
             <p id='loader' className='text-center' style={{margin:'30px', color: 'white'}}>
                LOADING PLEASE...</p> : content = 
                <Main 
                crowdFundingBalance= {this.state.crowdFundingBalance}
                target = {this.state.target}
                manager = {this.state.manager}
                createRequest = {this.createRequest}
                setEth = {this.setEth}
                sendEth = {this.sendEth}
                fundSend = {this.fundSend}
                vote = {this.vote}
                makepay = {this.makepay}
        
                /> }
        return (
            <div className='App' style={{position:'relative'}}>
                <div style={{height: '100vh', position: 'absolute'}}>
                    <ParticleSettings />    {/* style={{minHeight: '100vh'}}  */}
                </div>
                
                <Navbar account={this.state.account}/>
                <div className='container-fluid mt-5' >
                    {/* <h1>{console.log(this.state.loading)}</h1> */}
                    <div className='row'>
                        <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth:'600px', minHeight:'100vm'}}>
                            <div>
                                {/* <Main/> */}
                                {content}
                            </div>
                        </main>
                    </div> 
                </div>
                {/* <CreateRequest /> */}
            </div>
        )
    }
}

export default App;