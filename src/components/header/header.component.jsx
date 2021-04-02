import React,{useContext,useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
// import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CurrentUserContext from '../../contexts/current-user/current-user.context'
import CartContext from '../../contexts/cart/cart.context'

import './header.styles.scss';  

const Header = () => {
  const[hidden,setHidden]=useState(true)
  const currentUser= useContext(CurrentUserContext)
  const toggleHidden=()=>setHidden(!hidden)
  
  return(
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartContext.Provider value={{
        hidden,
        toggleHidden
      }}>
      <CartIcon />
      </CartContext.Provider>
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
)
      }

const mapStateToProps = createStructuredSelector({
  // currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
