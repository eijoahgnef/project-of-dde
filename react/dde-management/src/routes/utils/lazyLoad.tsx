import React, { Suspense } from 'react'
import { Spin } from 'antd';

const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
}
function lazyLoad(Comp: React.LazyExoticComponent<React.ComponentType<any>>): React.ReactNode {
  return (
    <Suspense fallback={<Spin size='large' style={styles}></Spin>}>
        <Comp/>
    </Suspense>
  )
}

export default lazyLoad
