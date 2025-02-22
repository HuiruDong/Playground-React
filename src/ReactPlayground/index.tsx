import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { Header, CodeEditor, Preview } from './components';


const ReactPlayground:React.FC = () => {
    return <div style={{height: '100vh'}}>
        <Header />
        {/* [100, 100] 就是按照 1:1 比例展示 */}
        <Allotment defaultSizes={[100, 100]}>
            <Allotment.Pane minSize={500}>
                <CodeEditor />
            </Allotment.Pane>
            <Allotment.Pane minSize={0}>
                <Preview />
            </Allotment.Pane>

        </Allotment>
    </div>
}

export default ReactPlayground