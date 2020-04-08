import Layout from '../../../components/Layout';
import Link from 'next/link'
import BlogRead from '../../../components/crud/BlogRead'
import Admin from '../../../components/auth/Admin';

const Blogs = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage blogss</h2>
                        </div>
                        <div className="col-md-12">
                           <BlogRead />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blogs;