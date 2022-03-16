import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
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
  }
];