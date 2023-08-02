import { useState } from "react";
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css'

export const Searchbar = ({hendleSearch}) =>{
    const [value, setValue] = useState('')
    const handleChange=(event)=>{
        setValue(event.target.value)
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        hendleSearch(value)
    }
    return (
        <header className={css.searchbar}>
            <form className="form" onSubmit={handleSubmit}>
            <button type="submit" className={css.button}>
                <span className="button-label">Search</span>
            </button>
            <input
                className={css.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={handleChange}
                value={value}
            />
            </form>
        </header>
    );
}
Searchbar.propTypes = {
    hendleSearch: PropTypes.func.isRequired,
}; 
/* export class Searchbar extends Component {
    state = {
        value: ''
    }

    handleChange=({target:{value}})=>{
        this.setState({value})
    }

    handleSubmit=(event)=>{
        event.preventDefault()
        this.props.hendleSearch(this.state.value)
    }

    render(){
        return (
            <header className={css.searchbar}>
                <form className="form" onSubmit={this.handleSubmit}>
                <button type="submit" className={css.button}>
                    <span className="button-label">Search</span>
                </button>
                <input
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handleChange}
                    value={this.state.value}
                />
                </form>
            </header>
        );
    }
};
*/