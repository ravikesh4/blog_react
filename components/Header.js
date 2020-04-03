import { useState } from 'react';
import {APP_NAME} from '../config';
import Link from 'next/link'
import {signout, isAuth} from '../actions/auth';
import Router from 'next/router'

// for progressbar on top 
import NProgress from 'nprogress';


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()


const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
        <Navbar color="light" light expand="md">
          <Link href="/">
            <NavLink style={{ cursor: 'pointer'}} className="font-weight-bold">{APP_NAME}</NavLink>
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>

            {/* signin and signup  */}
            {!isAuth() && (<React.Fragment>
              <NavItem>
                <Link href="/signin">
                    <NavLink style={{ cursor: 'pointer'}}>
                        Signin
                        </NavLink>
                    </Link>
              </NavItem>
              <NavItem>
                <Link href="/signup">
                    <NavLink style={{ cursor: 'pointer'}}>
                        Signup
                        </NavLink>
                    </Link>
              </NavItem>
              
            </React.Fragment>) }
              {/* {JSON.stringify(isAuth())} */}
              
              {/* user dashboard  */}
              {isAuth() && isAuth().role === 0 && (
                <NavItem>
                <Link href="/user">
                    <NavLink style={{ cursor: 'pointer'}} >
                        {`${isAuth().name}'s Dashboard`}
                        </NavLink>
                    </Link>
              </NavItem>
              )}

              {/* admin dashboard  */}
            {isAuth() && isAuth().role === 1 &&  (
                <NavItem>
                <Link href="/admin">
                    <NavLink style={{ cursor: 'pointer'}} >
                        {`${isAuth().name}'s Dashboard`}
                        </NavLink>
                    </Link>
              </NavItem>
              )}
              
              {/* signout section  */}
              {isAuth() && (
                <NavItem>
                <Link>
                    <NavLink style={{ cursor: 'pointer'}}  onClick={() => signout(() => Router.replace('/signin'))}>
                        Signout
                        </NavLink>
                    </Link>
              </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    
    )
}

export default Header;
