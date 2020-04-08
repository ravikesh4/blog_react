import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, DOMAIN, APP_NAME } from '../../config';
import renderHTML from 'react-render-html'
import moment from 'moment'
import SmalllCard from '../../components/blog/SmalllCard'

const SingleBlog = ({blog, query}) => {

    // const [related, setRelated] = useState([]);

    // const loadRelated = () => {
    //     listRelated({ blog }).then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    //             setRelated(data);
    //         }
    //     });
    // };

    // useEffect(() => {
    //     loadRelated();
    // }, []);

    
    const head = () => (
        <Head>
            <title>{blog.title} | {APP_NAME}</title>
            <meta
                name="description"
                content={blog.mdesc}
            />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
            <meta
                property="og:description"
                content={blog.mdesc}
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content="" />
        </Head>
    );

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))

    const showBlogTags = tag =>
        blog.tags.map((t, i) => {
            return <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        })

        const showRelatedBlog = () => {
            return related.map((blog, i) => (
                <div className="col-md-4" key={i}>
                    <article>
                        <SmalllCard blog="blog" />
                    </article>
                </div>
            ))
        }

    return <React.Fragment>
        {head()}
        <Layout>
            <main>
                <article>
                    <div className="container-fluid">
                        <section>
                            {/* {JSON.stringify(blog)} */}
                            <div className="row" style={{marginTop: '-30px'}}>
                                <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid featured-img"/>
                            </div>
                        </section>
                        <section>
                            <p className="lead mt-3 mark pt-1 pb-1">
                                Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                            </p>
                            <div className="pb-3">
                                {showBlogCategories(blog)}
                                {showBlogTags(blog)}
                                <hr />
                            </div>

                        </section>
                    </div>

                    <div className="container">
                        <section>
                            <div className="col-md-12 lead">
                                <h2 className="text-center">{renderHTML(blog.title)}</h2> 
                                {renderHTML(blog.body)}
                            </div>
                        </section>
                    </div>
                    <div className="container pb-5">
                        <h4 className="text-center pt-5 pb-5 h2">Related Blog</h4>
                        <hr />
                        <p>Show related blog</p>
                        {/* {showRelatedBlog()} */}
                    </div>


                    <div className="container pb-5">
                        <p>Show comment</p>
                    </div>
                    
                </article>
            </main>
        </Layout>
    </React.Fragment>
}

SingleBlog.getInitialProps = ({query}) => {
    return singleBlog(query.slug).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {blog: data, query}
        }
    })
}


export default SingleBlog;