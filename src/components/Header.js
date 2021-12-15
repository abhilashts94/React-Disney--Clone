import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebase'
import {
  selectUserName,
  selectUserEmail,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from '../features/user/userSlice'
import { Link } from 'react-router-dom'

function Header() {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const userName = useSelector(selectUserName)
  // const useremail = useSelector(selectUserEmail)
  const userPhoto = useSelector(selectUserPhoto)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        navigation('/home')
      }
    })
  }, [userName])

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user)
        })
        .catch((err) => {
          alert(err.message)
        })
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState())
          navigation('/')
        })
        .catch((err) => alert(err.message))
    }
  }

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    )
  }

  return (
    <Nav>
      <Link to='/'>
        <Logo src='/images/logo.svg' />
      </Link>
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <Link to='/home'>
              <a>
                <img src='/images/home-icon.svg' alt='homeIcon' />
                <span>HOME</span>
              </a>
            </Link>

            <a>
              <img src='/images/search-icon.svg' alt='searchIcon' />
              <span>SEARCH</span>
            </a>

            <a>
              <img src='/images/watchlist-icon.svg' alt='WLIcon' />
              <span>WATCHLIST</span>
            </a>

            <a>
              <img src='/images/original-icon.svg' alt='originalIcon' />
              <span>ORIGINALS</span>
            </a>

            <a>
              <img src='/images/movie-icon.svg' alt='movieIcon' />
              <span>MOVIES</span>
            </a>
            <a>
              <img src='/images/series-icon.svg' alt='homeIcon' />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  )
}

export default Header

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`

const Logo = styled.img`
  width: 80px;
  cursor: pointer;
`
const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    text-decoration: none;
    color: white;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: '';
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`

const UserImg = styled.img`
  height: 100%;
`

const Login = styled.button`
  border-radius: 4px;
  font-size: 15px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 36px;
  background-color: rgb(0, 0, 0);
  color: rgb(249, 249, 249);
  border: 2px solid rgb(249, 249, 249);
  letter-spacing: 1.8px;
  cursor: pointer;
  margin-left: auto;
  /* order: 1; */

  &:hover {
    background-color: rgb(198, 198, 198);
    color: rgb(0, 0, 0);
    border: 2px solid rgb(198, 198, 198);
  }
`
const DropDown = styled.div`
  position: fixed;
  /* top: 48px; */
  top: 54px;
  right: 40px;
  background: rgb(19, 19, 19);
  border: 1px solid rgb(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0/ 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 101px;
  opacity: 0;
`
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      /* position: fixed;
      right: 40px;
      top: 55px; */

      opacity: 1;
      transition-duration: 1s;
    }
  }
`
