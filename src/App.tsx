import { useEffect, useState } from 'react';
import Load from './components/load/load';

const App = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
    }, []);

    return <>{loading ? <Load active={loading} /> : <h1>W3lcome</h1>}</>;
};

export default App;
