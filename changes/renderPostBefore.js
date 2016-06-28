import React from 'react';
import moment from 'moment';
import {Table, Pagination} from 'react-bootstrap';

export default (props) => {
	var CCTable =[];
		var i = 1;
		if(props.this.props.posts){
			if (!props.this.props.posts.chatCounts){
				return <div>Loading...</div>;
			}else{
				console.log("tableData", props.this.state.tableData[0] != null);
				if (props.this.state.tableData && props.this.state.tableData != null && props.this.state.tableData[0] != null){
					console.log('masuk');
					props.this.state.tableData.map((post) => {
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
				}else{
					return <div>Loading...</div>;
				}

				if (props.this.state.sortNo == "asc"){
					CCTable = props.this.sortAscJSON(CCTable,"no");
				}else if (props.this.state.sortNo == "desc"){
					CCTable = props.this.sortAscJSON(CCTable,"no");
					CCTable = props.this.sortDescJSON(CCTable,"no");
				}else if (props.this.state.sortDate == "asc"){
					CCTable = props.this.sortAscJSON(CCTable,"date");
				}else if (props.this.state.sortDate == "desc"){
					CCTable = props.this.sortAscJSON(CCTable,"date");
					CCTable = props.this.sortDescJSON(CCTable,"date");
				}else if (props.this.state.sortCC == "asc"){
					CCTable = props.this.sortAscJSON(CCTable,"CC");
				}else if (props.this.state.sortCC == "desc"){
					CCTable = props.this.sortAscJSON(CCTable,"CC");
					CCTable = props.this.sortDescJSON(CCTable,"CC");
				}else if (props.this.state.sortCG == "asc"){
					CCTable = props.this.sortAscJSON(CCTable,"CG");
				}else if (props.this.state.sortCG == "desc"){
					CCTable = props.this.sortAscJSON(CCTable,"CG");
					CCTable = props.this.sortDescJSON(CCTable,"CG");
				}else if (props.this.state.sortInCC == "asc"){
					CCTable = props.this.sortAscJSON(CCTable,"inCC");
				}else if (props.this.state.sortInCC == "desc"){
					CCTable = props.this.sortAscJSON(CCTable,"inCC");
					CCTable = props.this.sortDescJSON(CCTable,"inCC");
				}else if (props.this.state.sortOutCC == "asc"){
					CCTable = props.this.sortAscJSON(CCTable,"outCC");
				}else if (props.this.state.sortOutCC == "desc"){
					CCTable = props.this.sortAscJSON(CCTable,"outCC");
					CCTable = props.this.sortDescJSON(CCTable,"outCC");
				}
				
				var chunkedData = _.chunk(CCTable,10);

				const tData = chunkedData[props.this.state.activePage-1].map((colName) => {
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
							   activePage={props.this.state.activePage}
							   onSelect={props.this.handlePageChange}>
							</Pagination>;
				return(
					<div>
						<div style={{height: "300px"}}>
							<Table striped bordered condensed hover>
							    <thead>
							      <tr className="trHeight">
							        <th className = "thNo" onClick = {props.this.handleSortNo}>
							        	<span>No.</span>
							        </th>
							        <th onClick = {props.this.handleSortDate}>
							        	<span style={{verticalAlign: "middle"}}>Date</span>
							        	<span className="dropdown">
							        		<span className="caret" style={{margin: "10px 0 10px 5px",color:"#ccc"}}></span>
							        	</span>
							        	<span className="dropup">
							        		<span className="caret" style={{margin: "10px 0",color:"#ccc"}}></span>
							        	</span>
							        </th>
							        <th>Day</th>
							         <th onClick = {props.this.handleSortCC}>
							        	<span style={{verticalAlign: "middle"}}>Chat Count</span>
							        	<span className="dropdown">
							        		<span className="caret" style={{margin: "10px 0 10px 5px",color:"#ccc"}}></span>
							        	</span>
							        	<span className="dropup">
							        		<span className="caret" style={{margin: "10px 0",color:"#ccc"}}></span>
							        	</span>
							        </th>
							         <th onClick = {props.this.handleSortCG}>
							        	<span style={{verticalAlign: "middle"}}>Chat Growth</span>
							        	<span className="dropdown">
							        		<span className="caret" style={{margin: "10px 0 10px 5px",color:"#ccc"}}></span>
							        	</span>
							        	<span className="dropup">
							        		<span className="caret" style={{margin: "10px 0",color:"#ccc"}}></span>
							        	</span>
							        </th>
							         <th onClick = {props.this.handleSortInCC}>
							        	<span style={{verticalAlign: "middle"}}>Incoming Chat</span>
							        	<span className="dropdown">
							        		<span className="caret" style={{margin: "10px 0 10px 5px",color:"#ccc"}}></span>
							        	</span>
							        	<span className="dropup">
							        		<span className="caret" style={{margin: "10px 0",color:"#ccc"}}></span>
							        	</span>
							        </th>
							         <th onClick = {props.this.handleSortOutCC}>
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