import React, { Component } from 'react'
import { Card,Button,Icon} from 'antd';
export default class Category extends Component {
    render() {
        return (
            <div>
            <Card 
                extra={<Button type="primary"><Icon type="plus-circle" />添加</Button>} 
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
        )
    }
}
