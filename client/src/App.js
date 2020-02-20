import React from 'react';

class App extends React.Component {

  constructor() {
    super();
    this.API_BASE = 'http://localhost:3001/api/wishes';
    this.state = {
      wishes: [],
      newWish: null
    }
  }

  onChange = (e) => {
    const text = e.target.value;
    const newWish = { title: text };
    this.setState({ newWish });
  }

  onSubmit = (e) => {
    e.preventDefault();
    fetch(this.API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newWish)
    })
      .then(res => this.updateWishesList())
      .catch(e => console.log(e));
  }

  componentDidMount() {
    this.updateWishesList();
  }

  updateWishesList = () => {
    fetch(this.API_BASE)
      .then(res => res.json())
      .then(json => {
        this.setState({
          wishes: json
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    const { wishes } = this.state;
    const wishesItems = wishes.map(wish => {
      return <WishItem key={wish._id} wish={wish} />
    });

    return (
      <div>
        <h1>Wish App</h1>
        <div>
          <AddWishForm onChange={this.onChange} onSubmit={this.onSubmit} />
        </div>
        <hr />
        <ul>
          {wishesItems}
        </ul>
      </div>
    );
  }

}

function WishItem({ wish }) {
  return (
    <li>{wish.title}</li>
  );
}

function AddWishForm({ onChange, onSubmit }) {

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
