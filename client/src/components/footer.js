import React from 'react';
import footerLogo from '../components/Images/instacook-text-logo.png'

const styles = {
  logo: {
    width: '15%',
    display: 'flex',
    padding: '1%',
    borderRadius: '10px'
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
}

export default function Footer() {
  return (
    <div style={styles.footerContainer}>
      <img style={styles.logo} src={footerLogo} alt='instacook logo'/>
    </div>
  );
}