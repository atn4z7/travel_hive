import React from 'react';
import { Tabs, Badge } from 'antd-mobile';
import { InspirationView } from '../Pages/TabViews/InspirationView';


const tabs = [
  { title: <Badge text={'3'}>First Tab</Badge> },
  { title: <Badge text={'今日(20)'}>Second Tab</Badge> },
  { title: <Badge dot>Third Tab</Badge> },
];

const tabs2 = [
  { title: 'Inspiration', sub: '1' },
  { title: 'Plan', sub: '2' },
  
];

export const TabNavigator = () => (
  <div>
    <Tabs tabs={tabs2}
      initialPage={0}
      onChange={(tab, index) => { console.log('onChange', index, tab); }}
      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >
      <div style={{  alignItems: 'center', marginTop:60,backgroundColor: '#fff' }}>
        <InspirationView />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of second tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of third tab
      </div>
    </Tabs>
    
  </div>
);