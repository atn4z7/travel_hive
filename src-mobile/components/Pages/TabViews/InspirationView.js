import React from 'react';
import { Carousel} from 'antd-mobile';
import { getInspirations } from '../../../userApi';

const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
  );

export class InspirationView extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
        slideIndex: 0,
        inspirations: []
      }
      componentDidMount() {
        // simulate img loading
        getInspirations().then((inspirationsArr) => {
          inspirationsArr ? this.setState({inspirations:inspirationsArr.inspirations}):
                            this.setState({inspirations:[{id:1,description:'TravelHive',image: require('../../../images/logo.png')}]});
          
        })
        setTimeout(() => {
          this.setState({
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
          });
        }, 100);
      }
      render() {
        return (
        <div >
            <Carousel className="space-carousel"
          frameOverflow="hidden"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
          //beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.state.inspirations.map((val, index) => (
            <a
              key={val.id}              
              style={{
                display: 'block',
                position: 'relative',
                top: this.state.slideIndex === index ? -10 : 0,
                height: this.state.imgHeight,
                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div className="polaroid">
                <img 
                 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19'}}
                  //src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                  src={val.image}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
                <div style={{padding: 10}}>
                  <p>{val.description}</p>
                </div>
              </div>
            </a>
          ))}
        </Carousel>
        </div>
        );
    }
}

