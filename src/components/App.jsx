import AppBar from './AppBar/AppBar';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Header from './Header/Header';
import Layout from './Layout/Layout';
import SearchBox from './SearchBox/SearchBox';

function App() {
  return (
    <Layout>
      <Header />
      <AppBar />
      <ContactForm />
      <SearchBox />
      <ContactList />
    </Layout>
  );
}

export default App;
