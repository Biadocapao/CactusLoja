import React from 'react'
import classes from './Footer.module.css';
import { ReactComponent as IconGithub } from '../../assets/github.svg'

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p>Projeto feito por <a href='https://github.com/Biadocapao?tab=repositories' target='_blank' rel='noreferrer'> Beatriz Marques <IconGithub /></a></p>
    </footer>
  )
}

export default Footer