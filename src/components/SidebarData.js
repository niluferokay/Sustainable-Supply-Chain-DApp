import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'side-text'
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'side-text'
  },
  {
    title: 'Assessments',
    path: '/assessments',
    icon: <MdIcons.MdAssessment />,
    cName: 'side-text'
  },
  {
    title: 'Journey',
    path: '/journey',
    icon: <FaIcons.FaMapMarkedAlt/>,
    cName: 'side-text'
  },
  {
    title: 'Network',
    path: '/network',
    icon: <FaIcons.FaGlobe />,
    cName: 'side-text'
  },
  {
    title: 'Sign Out',
    path: '/signout',
    icon: <IoIcons.IoIosExit/>,
    cName: 'side-text'
  }
];