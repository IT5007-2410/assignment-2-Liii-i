/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
    seatNumber:1
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
    seatNumber:2
  },
  {
    id: 3, name: 'John', phone: 88883333,
    bookingTime: new Date(),
    seatNumber:3
  },
  {
    id: 4, name: 'Doe', phone: 88882222,
    bookingTime: new Date(),
    seatNumber:4
  },
  {
    id: 5, name: 'Jane', phone: 88881111,
    bookingTime: new Date(),
    seatNumber:5
  }
];


function TravellerRow(props) {
  const { id, name, phone, bookingTime, seatNumber } = props.traveller;
  //Q3. Placeholder to initialize local variable based on traveller prop.*/}
  return (
    // Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
    <tr>
	    <td>{id}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{bookingTime.toLocaleString(('en-US'))}</td>
      <td>{seatNumber}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  if (props.travellers.length === 0) {
    return <p>No travellers to display.</p>;
  }
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Seat Number</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {props.travellers.map(traveller => <TravellerRow key={traveller.id} traveller={traveller} />)}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      travellerName: '',
      travellerPhone:'',
      seatNumber: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const { travellerName, travellerPhone, seatNumber } = this.state;
    const newTraveller = {
      name: travellerName,
      phone: travellerPhone,
      bookingTime: new Date(),
      seatNumber: parseInt(seatNumber),
    };
    this.props.bookTraveller(newTraveller); 
    this.setState({ travellerName: '', travellerPhone: '', seatNumber: '' }); // 重置表单

  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input 
          type="text" name="travellerName" placeholder="Name" 
          value={this.state.travellerName}
          onChange={this.handleInputChange}
        />
        <input 
          type="text" 
          name="travellerPhone" 
          placeholder="Phone" 
          value={this.state.travellerPhone}
          onChange={this.handleInputChange} 
        />
        <input 
          type="number" 
          name="seatNumber" 
          placeholder="Seat Number" 
          value={this.state.seatNumber}
          onChange={this.handleInputChange} 
        />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.state = {
      travellerName: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const { travellerName } = this.state;
    this.props.deleteTraveller(travellerName);
    this.setState({ travellerName: '' }); 
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	    <input 
      type="text" name="travellerName" placeholder="Name" 
      value={this.state.travellerName} 
      onChange={this.handleInputChange}
      />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    const { totalSeats, freeSeats } = this.props;
    const reservedSeats = totalSeats - freeSeats;
    const percentageFree = ((freeSeats / totalSeats) * 100).toFixed(1); // 计算空座位的百分比

    return (
      <div>
        <h2>Free Seats: {freeSeats}/{totalSeats} ({percentageFree}%)</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
          {Array.from({ length: totalSeats }, (_, index) => (
            <div
              key={index}
              style={{
                width: '30px',
                height: '30px',
                margin: '5px',
                backgroundColor: index < reservedSeats ? 'grey' : 'green',
                borderRadius: '5px'
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { 
      travellers: [], 
      selector: 'home',
      totalSeats: 10,
      freeSeats: 5
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(newTraveller) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
    const newId = this.state.travellers.length > 0 
    ? Math.max(...this.state.travellers.map(t => t.id)) + 1 
    : 1;
  
    const travellerWithId = { ...newTraveller, id: newId };

    this.setState((prevState) => ({
      travellers: [...prevState.travellers, travellerWithId],
      freeSeats: prevState.freeSeats - 1 
    }));
  }

  deleteTraveller(travellerName) {
    this.setState((prevState) => {
      const updatedTravellers = prevState.travellers.filter(
        traveller => traveller.name.toLowerCase() !== travellerName.toLowerCase()
      );
  
      const updatedFreeSeats = prevState.freeSeats + (prevState.travellers.length - updatedTravellers.length);
      
      return { 
        travellers: updatedTravellers, 
        freeSeats: updatedFreeSeats 
      };
    });
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          <button onClick={() => this.setSelector('home')}>Home</button>
          <button onClick={() => this.setSelector('display')}>Display Travellers</button>
          <button onClick={() => this.setSelector('add')}>Add</button>
          <button onClick={() => this.setSelector('delete')}>Delete</button>
            {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
        </div>
        <div>
          {this.state.selector === 'home' && <Homepage totalSeats={this.state.totalSeats} freeSeats={this.state.freeSeats} />}
          {this.state.selector === 'display' && <Display travellers={this.state.travellers} />}
          {this.state.selector === 'add' && <Add bookTraveller={this.bookTraveller} />}
          {this.state.selector === 'delete' && <Delete deleteTraveller={this.deleteTraveller} />}
            
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {/*Q3. Code to call component that Displays Travellers.*/}
          
          {/*Q4. Code to call the component that adds a traveller.*/}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
