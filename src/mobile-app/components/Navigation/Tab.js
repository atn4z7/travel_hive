import React from 'react';
import { Tabs, Badge } from 'antd-mobile';
import { InspirationView } from '../Pages/TabViews/InspirationView';
import { Explore } from '../../../components/Pages/Explore/Explore';

const tabs2 = [
  { title: 'Inspiration', sub: '1' },
  { title: 'Plan', sub: '2' },
  { title: 'Explore', sub: '3'}
  
];

export const TabNavigator = () => (
  <div>
    <Tabs tabs={tabs2}
      initialPage={0}      
    >
      <div style={{  alignItems: 'center', marginTop:60,backgroundColor: '#fff' }}>
        <InspirationView />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Planning here soon!
      </div>
      <div style={{ }}>
        <Explore />
      </div>
    </Tabs>
    
  </div>
);