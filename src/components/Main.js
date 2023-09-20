import React, {Component} from 'react'
// import Web3 from 'web3'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import bank from '../bank.png'

class Main extends Component {
    // Our React Code goes in Here !
    render () {

        return (
            // <div id='content' className='mt-3'>
            //     <table className='table text-muted text-center'>
            //         <thead>
            //             <tr style={{color:'white'}}>
            //                 <th scope='col'>CrowdFunding Balance</th>
            //                 <th scope='col'>Deadline</th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             <tr style={{color:'white'}}>
            //                 <td>{window.web3.utils.fromWei(this.props.crowdFundingBalance, 'Ether')} Ether</td>
            //                 <td>{window.web3.utils.fromWei(this.props.target, 'Ether')} Sec</td>
            //             </tr>
            //         </tbody>
            //     </table>

            //     <div className='card mb-2' style={{opacity: '.9'}}>
            //         <form 
            //         onSubmit={(event) => {     // Creating Functionality of Button
            //             event.preventDefault()
            //             let amount
            //             amount = this.input.value.toString()
            //             amount = window.web3.utils.toWei(amount, 'Ether')
            //             this.props.setEth(amount, 3600)
            //         }}
            //         className='mb-3'>
            //             <div style={{borderSpacing: '0 1em'}}>
            //                 <label className='float-left' style={{marginLeft: '15px'}}><b>Stake Tokens</b></label>
            //                 <span className='float-right' style={{marginRight:'8px'}}>
            //                     Balance: {window.web3.utils.fromWei(this.props.crowdFundingBalance, 'Ether')}
            //                 </span>
            //                 <div className='input-group mb-4'>
            //                     <input
            //                      ref={(input) =>{this.input = input}} 
            //                      type='text' placeholder='0' rquired/>     {/* ! ^'_._'^ ! Creating reference to input such that the Button functionality can be done */}
            //                     <div className='input-group-open'>
            //                         <div className='input-group-text'>
            //                             <img alt='tether' src={tether} height='32'/>
            //                             &nbsp;&nbsp;&nbsp; USDT
            //                         </div>
            //                     </div>
            //                 </div>
            //                 <button type='submit' className='btn btn-primary btn-lg btn-block'>DEPOSIT</button>
            //             </div>
            //         </form>
            //         <button 
            //         type= 'submit'
            //         onClick={(event) => {
            //             event.preventDefault(
            //             this.props.unstakeTokens()
            //             )
            //         }}
            //         className='btn btn-primary btn-lg btn-block'>WITHDRAW</button>
            //         <div className='card-body text-center' style={{color:'blue'}}>
            //             AIRDROP</div>

            //     </div>

            // </div>

            <div id='content' className='mt-3'>

                <table className='table text-muted text-center'>
                    <thead>
                        <tr style={{color:'white'}}>
                            <th scope='col'>CrowdFunding Balance</th>
                            <th scope='col'>Minimum Target Funds</th>
                            {/* Add No of COntributors for FUnding  */}
                      </tr>
                    </thead>
                    <tbody>
                        <tr style={{color:'white'}}>
                            <th scope='col'>{this.props.crowdFundingBalance}</th>  
                            <th scope='col'>{this.props.target}</th>
                      </tr>
                    </tbody>
                </table>

                {/* Setting Eth - target and Deadline of App */}
                <div className='card mb-1' style={{opacity: '.9'}}>
                    <form className='mb-3' 
                    onSubmit={(event) => {     // Creating Functionality of Button
                        event.preventDefault()
                        let target, time
                        target = this.tar.value.toString()
                        time = this.time.value.toString()
                        console.log(target, time)
                        target = window.web3.utils.fromWei(target, 'ether')
                        console.log(target, time)
                        this.props.setEth(target, time)
                    }} >
                        <h4 style={{display: 'flex', justifyContent: 'center'}}>Set Minimum Funds</h4>
                        <div>
                            {/* string memory _description, address payable _reciepent, uint _value */}
                            <table>
                                <tr>
                                    <td><label>Enter Minimum Target: </label></td>
                                    <td><input ref={(tar) =>{this.tar = tar}} type='number' placeholder='0'/></td>
                                </tr>
                                <tr>
                                    <td><label>Enter TimeLimit : </label></td>
                                    <td><input ref={(time) =>{this.time = time}} type='number' placeholder='(in seconds)' /></td>
                                </tr>
                            </table> 
                             
                        </div>
                        <div>
                        <button type='submit' className='btn btn-primary btn-lg btn-block'>Set Targets</button>
                        </div>
                    </form>
                </div>

                {/* Send Ethers from other accounts to Crowdfunding balance */}
                <div className='card mb-1' style={{opacity: '.9', marginTop: '2rem'}}>
                    <form className='mb-3'
                    onSubmit={(event) => {     // Creating Functionality of Button
                        event.preventDefault()
                        let fund
                        fund = this.tar.value.toString()
                        fund = window.web3.utils.toWei(fund, 'wei')
                        //this.props.sendEth(fund)
                        this.props.fundSend(fund)
                    }} >
                        <h4 style={{display: 'flex', justifyContent: 'center'}}>Send Funds for CrowdFunding</h4>
                        <div>
                            {/* string memory _description, address payable _reciepent, uint _value */}
                            <table>
                                <tr>
                                    <td><label>Enter Amount of Funds: </label></td>
                                    <td><input ref={(tar) =>{this.tar = tar}} type='number' placeholder='Eg. 100'/></td>
                                </tr>
                                
                            </table>   
                        </div>
                        <div>
                        <button type='submit' className='btn btn-primary btn-lg btn-block'>Send Funds</button>
                        </div>
                    </form>
                </div>

                {/* Create Requests for Raising Funds */}
                <div className='card mb-1' style={{opacity: '.9' , marginTop: '2rem'}}>
                    <form className='mb-3' 
                    onSubmit={(event) => {     // Creating Functionality of Button
                        event.preventDefault()
                        let amount, desc, address
                        amount = this._value.value.toString()
                        address = this._address.value
                        desc = this._desc.value.toString()
                        amount = window.web3.utils.toWei(amount, 'wei')
                        this.props.createRequest(desc, address, amount)
                    }}>
                        <h4 style={{display: 'flex', justifyContent: 'center'}}>Create Requests</h4>
                        <div>
                            {/* string memory _description, address payable _reciepent, uint _value */}
                            <table>
                                <tr>
                                    <td><label>Enter Description of Funds: </label></td>
                                    <td><input ref={(_desc) =>{this._desc = _desc}} type='text' placeholder='Eg. Business needs'/></td>
                                </tr>
                                <tr>
                                    <td><label>Enter Reciepent Address : </label></td>
                                    <td><input ref={(_address) =>{this._address = _address}} type='text' placeholder='Eg. 0x12349' /></td>
                                </tr>
                                <tr>
                                    <td><label>Enter Amount Needed : </label></td>
                                    <td><input ref={(_value) =>{this._value = _value}}  type='number' placeholder='0' /> Ethers</td>
                                </tr>
                            </table> 
                             
                        </div>
                        <div>
                        <button type='submit' className='btn btn-primary btn-lg btn-block'>Submit Request</button>
                        </div>
                    </form>
                </div>


                {/* List of All Requests generated ... */}
                <div className='card mb-1' style={{opacity: '.9' , marginTop: '2rem'}}>
                    <h2 className='card header'>Requests Available</h2>
                    {/* {this.props.crowdFunding.map(c => 
                        <div className='card1'>
                            <div className='title'>Request No : {c.requestno}</div>
                        </div>
                    )} */}
                    
                    
                </div>
                
                {/* To do code for Displaying  ... Requests ^^^ . */}


                {/* Contributors - Vote for the Requests */}
                <div className='card mb-1' style={{opacity: '.9' , marginTop: '2rem'}}>
                    <form className='mb-3'
                    onSubmit={(event) => {     // Creating Functionality of Button
                        event.preventDefault()
                        let requestno
                        requestno = this.no.value
                        //requestno = window.web3.utils.toWei(amount, 'Wei')
                        this.props.vote(requestno)
                    }} >
                        <h4 style={{display: 'flex', justifyContent: 'center'}}>Vote for Requests</h4>
                        <div>
                            {/* string memory _description, address payable _reciepent, uint _value */}
                            <table>
                                <tr>
                                    <td><label>Enter Request No : </label></td>
                                    <td><input ref={(no) =>{this.no = no}} type='number' placeholder='Eg. 0'/></td>
                                </tr>
                                
                            </table> 
                             
                        </div>
                        <div>
                        <button type='submit' className='btn btn-primary btn-lg btn-block'>Vote Request</button>
                        </div>
                    </form>
                </div>

                {/* Make Payment for the Majority Request ...*/}
                <div className='card mb-1' style={{opacity: '.9' , marginTop: '2rem'}}>
                    <form className='mb-3' 
                    onSubmit={(event) => {     // Creating Functionality of Button
                        event.preventDefault()
                        let requestno
                        requestno = this.no.value
                        //requestno = window.web3.utils.toWei(amount, 'Wei')
                        this.props.makepay(requestno)
                    }} >
                        <h4 style={{display: 'flex', justifyContent: 'center'}}>Make Payments</h4>
                        <div>
                            {/* string memory _description, address payable _reciepent, uint _value */}
                            <table>
                                <tr>
                                    <td><label>Enter Request No. for Payment: </label></td>
                                    <td><input ref={(no) =>{this.no = no}} type='number' placeholder='Eg. 0'/></td>
                                </tr>
                            </table> 
                             
                        </div>
                        <div>
                        <button type='submit' className='btn btn-primary btn-lg btn-block'>Pay </button>
                        </div>
                    </form>
                </div>






            </div>
        )
    }
}

export default Main;

