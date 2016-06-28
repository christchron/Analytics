import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fetchDataActionCreators from '../actions/index';
import {Link , browserHistory} from 'react-router';
import moment from 'moment';
import DateTimeField from 'react-bootstrap-datetimepicker';
import LineChart from './line_chart';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import _ from 'lodash';
import Select from 'react-select';
import BelowData from './below_data';
import ShowTable from './show_table';
import ActiveButton from './show_active_button';
import {Table, Pagination} from 'react-bootstrap';
import equals from 'array-equal';

class ShowChart extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor() {
		super();
		this.state = { 
			checked: false, 
			activePage:1,
			start: moment().subtract(31, 'days'), 
			end: moment().add(-1, 'days'), 
			url:'daily',
			sortNo: 'asc',
			sortDate: 'no',
			sortCC: 'no',
			sortCG: 'no',
			sortInCC: 'no',
			sortOutCC: 'no',
			selectValue: "chatcount",
			tableData: []
		};
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleHourlyButton = this.handleHourlyButton.bind(this);
		this.handleDailyButton = this.handleDailyButton.bind(this);
		this.handleWeeklyButton = this.handleWeeklyButton.bind(this);
		this.handleMonthlyButton = this.handleMonthlyButton.bind(this);
		this.renderPosts = this.renderPosts.bind(this);
		this.mySortFunc = this.mySortFunc.bind(this);
		this.handleSelectedAnalytics = this.handleSelectedAnalytics.bind(this);
		this.setStartState = this.setStartState.bind(this);
		this.setTableData = this.setTableData.bind(this);
		this.sortAscJSON = this.sortAscJSON.bind(this);
		this.sortDescJSON = this.sortDescJSON.bind(this);
		this.handleSortNo = this.handleSortNo.bind(this);
		this.handleSortDate = this.handleSortDate.bind(this);
		this.handleSortCC = this.handleSortCC.bind(this);
		this.handleSortCG = this.handleSortCG.bind(this);
		this.handleSortInCC = this.handleSortInCC.bind(this);
		this.handleSortOutCC = this.handleSortOutCC.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);

	}

	componentWillMount() {
		this.setStartState();
	}

	setStartState(){
		this.setState({
			url: this.props.location.pathname
		});
		if (this.props.location.pathname.indexOf('hourly') !== -1){
			console.log("hourly");
			this.props.fetchChartAction.fetchChartData("chatcount-hourly.json");
		} else if (this.props.location.pathname.indexOf('daily') !== -1){
			console.log("daily");
			this.props.fetchChartAction.fetchChartData("A5zHSH7f.json");
		} else if (this.props.location.pathname.indexOf('weekly')!== -1){
			console.log("weekly");
			this.props.fetchChartAction.fetchChartData("chatcount-weekly.json")
		} else if (this.props.location.pathname.indexOf('monthly')!== -1){
			console.log("monthly");
			this.props.fetchChartAction.fetchChartData("chatcount-monthly.json")
		}
	}

	handleCheckBoxChange() {
	    this.setState({
	      checked: !this.state.checked
	    });	    
	}

	handleStartDateChange(startD){
		this.setState({
	      start: startD
	    });
	}

	handleEndDateChange(endD){
		this.setState({
			end: endD
		});
	}

	handleHourlyButton(){
		this.setState({
			checked: false,
			url: "hourly"
		});
		this.props.fetchChartAction.fetchChartData("chatcount-hourly.json")
	}

	handleDailyButton(){
		this.setState({
			checked: false,
			url: "daily"
		});
		this.props.fetchChartAction.fetchChartData("A5zHSH7f.json")
	}

	handleWeeklyButton(){
		this.setState({
			checked: false,
			url: "weekly"
		});
		this.props.fetchChartAction.fetchChartData("chatcount-weekly.json")
	}

	handleMonthlyButton(){
		this.setState({
			checked: false,
			url: "monthly"
		});
		this.props.fetchChartAction.fetchChartData("chatcount-monthly.json")
	}

	handleSelectedAnalytics(val){
		this.setState({
			selectValue: val.target.value,
			url: val.target.value
		});
		this.props.fetchChartAction.fetchChartData("A5zHSH7f.json");
		this.context.router.replace(val.target.value);
	}

	handleSortNo(){
		console.log("no");
		if (this.state.sortNo == "asc"){
			this.setState({
				sortNo: "desc",
				sortDate: 'no',
				sortCC: 'no',
				sortCG: 'no',
				sortInCC: 'no',
				sortOutCC: 'no',
			});
		}else{
			this.setState({
				sortNo: "asc",
				sortDate: 'no',
				sortCC: 'no',
				sortCG: 'no',
				sortInCC: 'no',
				sortOutCC: 'no',
			});
		}
	}

	handleSortDate(){
		console.log("date");
		if (this.state.sortDate == "asc"){
			this.setState({
				sortNo: "no",
				sortDate: 'desc',
				sortCC: 'no',
				sortCG: 'no',
				sortInCC: 'no',
				sortOutCC: 'no',
			});
		}else{
			this.setState({
				sortNo: "no",
				sortDate: 'asc',
				sortCC: 'no',
				sortCG: 'no',
				sortInCC: 'no',
				sortOutCC: 'no',
			});
		}
	}

	handleSortCC(){
		console.log("CC");
		if (this.state.sortCC == "asc"){
			this.setState({
				sortNo: "no",
				sortDate: 'no',
				sortCC: 'desc',
				sortCG: 'no',
				sortInCC: 'no',
				sortOutCC: 'no',
			});
		}else{
			this.setState({
				sortNo: "no",
				sortDate: 'no',
				sortCC: 'asc',
				sortCG: 'no',
				sortInCC: 'no',
				sortOutCC: 'no',
			});
		}
	}

	handleSortCG(){
		console.log("CG");
		if (this.state.sortCG == "asc"){
			this.setState({
				sortNo: "no",
				sortDate: 'no',
				sortCC: 'no',
				sortCG: 'desc',
				sortInCC: 'no',
				sortOutCC: 'no',
			});
		}else{
			this.setState({
				sortNo: "no",
				sortDate: 'no',
				sortCC: 'no',
				sortCG: 'asc',
				sortInCC: 'no',
				sortOutCC: 'no',
			});
		}
	}

	handleSortInCC(){
		console.log("InCC");
		if (this.state.sortInCC == "asc"){
			this.setState({
				sortNo: "no",
				sortDate: 'no',
				sortCC: 'no',
				sortCG: 'no',
				sortInCC: 'desc',
				sortOutCC: 'no',
			});
		}else{
			this.setState({
				sortNo: "no",
				sortDate: 'no',
				sortCC: 'no',
				sortCG: 'no',
				sortInCC: 'asc',
				sortOutCC: 'no',
			});
		}
	}

	handleSortOutCC(){
		console.log("OutCC");
		if (this.state.sortOutCC == "asc"){
			this.setState({
				sortNo: "no",
				sortDate: 'no',
				sortCC: 'no',
				sortCG: 'no',
				sortInCC: 'no',
				sortOutCC: 'desc',
			});
		}else{
			this.setState({
				sortNo: "no",
				sortDate: 'no',
				sortCC: 'no',
				sortCG: 'no',
				sortInCC: 'no',
				sortOutCC: 'asc',
			});
		}
	}

	handlePageChange(eventKey) {
		console.log("selectedEvent",eventKey);
	   	this.setState({activePage: eventKey});
	}

	setTableData(tableData){
		this.setState({
			tableData: tableData
		});
	}

	getChatCountList(){
		if(this.props.posts){
			if (!this.props.posts.chatCounts){
				return <tr><td>Loading...</td></tr>;
			}else{
				return this.props.posts.chatCounts.map((post) => {return post.chatCount});
			}
		}else{
			return <div>Loading...</div>
		}
	}

	getChatGrowthList(){
		if(this.props.posts){
			if (!this.props.posts.chatCounts){
				return <tr><td>Loading...</td></tr>;
			}else{
				return this.props.posts.chatCounts.map((post) => {return post.chatGrowth});
			}
		}else{
			return <div>Loading...</div>
		}
	}

	getChartLabel(){
		var i = 0;
		if(this.props.posts){
			if (!this.props.posts.chatCounts){
				return <tr><td>Loading...</td></tr>;
			}else{
				if (this.state.url.indexOf('hourly') !== -1){
					var curDay = '';
					return this.props.posts.chatCounts.map((post) => 
					{
						var day = moment(new Date(post.periodStart));
						if (curDay != day.format('dddd')){
							curDay = day.format('dddd');
							return day.format("LLL");
						}else{
							return '';
						}
					});
				}else if (this.state.url.indexOf('daily') !== -1){
					return this.props.posts.chatCounts.map((post) => 
					{
						var day = moment(new Date(post.periodStart));
						return day.format("LL");
					});
				}else if (this.state.url.indexOf('weekly') !== -1){
					return this.props.posts.chatCounts.map((post) => 
						{
							var day = moment(new Date(post.periodStart));
							if (day.format("dddd").indexOf('Monday') !== -1){
								return day.format("LL");
							}else{
								return '';
							}
						}
					);
				}else if (this.state.url.indexOf('monthly') !== -1){
					return this.props.posts.chatCounts.map((post) => 
						{
							var day = moment(new Date(post.periodStart));
							if (day.format("LL").indexOf('January') !== -1){
								var monthYear = ''+ day.format("MMMM") + day.format("YYYY");
								return monthYear;
							}else{
								return day.format("MMMM");
							}		
						}
					);
				}
			}
		}else{
			return <div>Loading...</div>
		}
	}

	mySortFunc(a,b,order){
		if (this.state.url.indexOf("weekly") !== -1){
			if (order == "asc"){
				if (a.date != b.date ){
					return moment(a.date,"MM/YYYY") - moment(b.date,"MM/YYYY");		
				}else{
					return a.no - b.no;
				}
			}
			else{
				if (a.date != b.date ){
					return moment(b.date,"MM/YYYY") - moment(a.date,"MM/YYYY");		
				}else{
					return b.no - a.no;
				}
			}
		}else if (this.state.url.indexOf("monthly") !== -1){
			if (order == "asc"){
				if (a.date != b.date ){
					return moment(a.date,"YYYY") - moment(b.date,"YYYY");		
				}else{
					return a.no - b.no;
				}
			}
			else{
				if (a.date != b.date ){
					return moment(b.date,"YYYY") - moment(a.date,"YYYY");		
				}else{
					return b.no - a.no;
				}
			}
		}else{
			if (order == "asc"){
				if (a.date != b.date ){
					return moment(a.date,"DD/MM/YYYY") - moment(b.date,"DD/MM/YYYY");		
				}else{
					return a.no - b.no;
				}
			}
			else{
				if (a.date != b.date ){
					return moment(b.date,"DD/MM/YYYY") - moment(a.date,"DD/MM/YYYY");		
				}else{
					return b.no - a.no;
				}
			}
		}
	}

	sortAscJSON(json,key){
		return _.sortBy(json,key);
	}

	sortDescJSON(json,key){
		return json.reverse(key);
	}

	renderPosts() {
		var CCTable =[];
		var i = 1;
		if(this.props.posts){
			if (!this.props.posts.chatCounts){
				return <div>Loading...</div>;
			}else{
				this.props.posts.chatCounts.map((post) => {
					var tempPost = {
						no: i,
						date: moment(new Date(post.periodStart)).format("DD/MM/YYYY"), 
						day: moment(new Date(post.periodStart)).format("dddd"), 
						inCC: post.incomingChatCount, outCC: post.outgoingChatCount, 
						CC: post.chatCount, 
						CG: post.chatGrowth};	
					i++;
					CCTable.push(tempPost);					
				});
				if (this.state.sortNo == "asc"){
					CCTable = this.sortAscJSON(CCTable,"no");
				}else if (this.state.sortNo == "desc"){
					CCTable = this.sortAscJSON(CCTable,"no");
					CCTable = this.sortDescJSON(CCTable,"no");
				}else if (this.state.sortDate == "asc"){
					CCTable = this.sortAscJSON(CCTable,"date");
				}else if (this.state.sortDate == "desc"){
					CCTable = this.sortAscJSON(CCTable,"date");
					CCTable = this.sortDescJSON(CCTable,"date");
				}else if (this.state.sortCC == "asc"){
					CCTable = this.sortAscJSON(CCTable,"CC");
				}else if (this.state.sortCC == "desc"){
					CCTable = this.sortAscJSON(CCTable,"CC");
					CCTable = this.sortDescJSON(CCTable,"CC");
				}else if (this.state.sortCG == "asc"){
					CCTable = this.sortAscJSON(CCTable,"CG");
				}else if (this.state.sortCG == "desc"){
					CCTable = this.sortAscJSON(CCTable,"CG");
					CCTable = this.sortDescJSON(CCTable,"CG");
				}else if (this.state.sortInCC == "asc"){
					CCTable = this.sortAscJSON(CCTable,"inCC");
				}else if (this.state.sortInCC == "desc"){
					CCTable = this.sortAscJSON(CCTable,"inCC");
					CCTable = this.sortDescJSON(CCTable,"inCC");
				}else if (this.state.sortOutCC == "asc"){
					CCTable = this.sortAscJSON(CCTable,"outCC");
				}else if (this.state.sortOutCC == "desc"){
					CCTable = this.sortAscJSON(CCTable,"outCC");
					CCTable = this.sortDescJSON(CCTable,"outCC");
				}
				var chunkedData = _.chunk(CCTable,10);
				console.log(chunkedData[this.state.activePage-1]);

				const tData = chunkedData[this.state.activePage-1].map((colName) => {
					return(
						<tr key={colName.no}>
					        <td>{colName.no}</td>
					        <td>{colName.date}</td>
					        <td>{colName.day}</td>
					        <td>{colName.CC}</td>
					        <td>{colName.CG}</td>
					        <td>{colName.inCC}</td>
					        <td>{colName.outCC}</td>
				      	</tr>	
					);
				});

				const page = <Pagination
							   className={CCTable.length === 0? 'hidden':'shown'}
							   style={{float: "right"}}
							   prev
							   next
							   first
							   last
							   ellipsis
							   items={(_.floor(CCTable.length / 10)) +1}
							   maxButtons={3}
							   boundaryLinks
							   activePage={this.state.activePage}
							   onSelect={this.handlePageChange}>
							</Pagination>;
				return(
					<div>
						<div style={{height: "300px"}}>
							<Table striped bordered condensed hover>
							    <thead>
							      <tr className="trHeight">
							        <th className = "thNo" onClick = {this.handleSortNo}>
							        	<span>No.</span>
							        </th>
							        <th onClick = {this.handleSortDate}>
							        	<span style={{verticalAlign: "middle"}}>Date</span>
							        	<span className="dropdown">
							        		<span className="caret" style={{margin: "10px 0 10px 5px",color:"#ccc"}}></span>
							        	</span>
							        	<span className="dropup">
							        		<span className="caret" style={{margin: "10px 0",color:"#ccc"}}></span>
							        	</span>
							        </th>
							        <th>Day</th>
							         <th onClick = {this.handleSortCC}>
							        	<span style={{verticalAlign: "middle"}}>Chat Count</span>
							        	<span className="dropdown">
							        		<span className="caret" style={{margin: "10px 0 10px 5px",color:"#ccc"}}></span>
							        	</span>
							        	<span className="dropup">
							        		<span className="caret" style={{margin: "10px 0",color:"#ccc"}}></span>
							        	</span>
							        </th>
							         <th onClick = {this.handleSortCG}>
							        	<span style={{verticalAlign: "middle"}}>Chat Growth</span>
							        	<span className="dropdown">
							        		<span className="caret" style={{margin: "10px 0 10px 5px",color:"#ccc"}}></span>
							        	</span>
							        	<span className="dropup">
							        		<span className="caret" style={{margin: "10px 0",color:"#ccc"}}></span>
							        	</span>
							        </th>
							         <th onClick = {this.handleSortInCC}>
							        	<span style={{verticalAlign: "middle"}}>Incoming Chat</span>
							        	<span className="dropdown">
							        		<span className="caret" style={{margin: "10px 0 10px 5px",color:"#ccc"}}></span>
							        	</span>
							        	<span className="dropup">
							        		<span className="caret" style={{margin: "10px 0",color:"#ccc"}}></span>
							        	</span>
							        </th>
							         <th onClick = {this.handleSortOutCC}>
							        	<span style={{verticalAlign: "middle"}}>Outgoung Chat</span>
							        	<span className="dropdown">
							        		<span className="caret" style={{margin: "10px 0 10px 5px",color:"#ccc"}}></span>
							        	</span>
							        	<span className="dropup">
							        		<span className="caret" style={{margin: "10px 0",color:"#ccc"}}></span>
							        	</span>
							        </th>
							      </tr>
							    </thead>
							    <tbody>
							      	{tData}
							    </tbody>
						  	</Table>
						</div>
					  	<div>
					  		{page}
					  	</div>
					</div>
				);
			}
		}else{
			return <div>Loading...</div>
		}
	}

	render() {
		const chatCountList=this.getChatCountList();
		const chatGrowthList=this.getChatGrowthList();
		const chatLabel = this.getChartLabel();
		const content = this.state.checked 
    		? <div>
	      		<LineChart data = {chatCountList} data2={chatGrowthList} label = {chatLabel} redraw/>
	      		<BelowData data = {this.props.posts}/>
	      	</div>	
			:<div>
		      	{this.renderPosts()}	
				<BelowData data = {this.props.posts}/>
			</div>;
		const startDate = moment(new Date(+this.state.start));
		const endDate = moment(new Date(+this.state.end));
		return (
			<div>
				<h3>Chat Count</h3>
				<div className="row">
					<div className="col-md-12">
						<div className="col-md-2">
						  	<select
							    name="Analytics Type"
							    onChange={this.handleSelectedAnalytics}>
							     <option value="daily" className="select-hr">CHAT COUNT</option>
							     <option value="conversation" className="select-hr">CONVERSATION</option>
							     <option value="C" className="select-hr">C</option>
						    </select>
						</div>
						<div className="col-md-1">
							<label className = 'label'>
								<input 
						  			type="checkbox" 
						  			checked={ this.state.checked } 
						  			onChange={ this.handleCheckBoxChange } />  Show Chart
					  		</label>
					  	</div>
					  	<div className="col-md-2">
					  		<p className="periode">
					  			<label className = 'label'>Periode</label>
					  		</p>
				  		</div>
				  			<div className="col-md-2">
					  		<DateTimeField defaultText= {startDate.format("L") +' '+ startDate.format("LT")}
					  			inputFormat="MM/DD/YYYY h:mm A"
					  			onChange = {this.handleStartDateChange} />
					  			</div>
				  			<div className="col-xs-1">
					  			<p className="until">-</p>
				  			</div>
					  	<div className="col-md-2">
				  			<DateTimeField defaultText={endDate.format("L") +' ' + endDate.format("LT")} 
				  				inputFormat="MM/DD/YYYY h:mm A"
				  				minDate = {startDate.add(1,'days')}
				  				maxDate = {moment().subtract(1,'days')}
				  				onChange = {this.handleEndDateChange}/>
				  		</div>
				  		<ActiveButton url={this.state.url} handler = {this} />				  		
				  	</div>
				</div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { posts: state.posts.all }
}

const mapDispatchToProps = (dispatch) => {
	return{
		fetchChartAction: bindActionCreators(fetchDataActionCreators,dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowChart); 