<!-- 调用案例 -->
<view class="listBox">
	<myList @getTimeValue='getTimeValue' labelText='预约时间' type='time' ref='ref3' mode='YY年MM月DD日' showCurrentTime='true'></myList>
</view>
<view class="listBox">
	<myList @getInputValue='getInputValue' labelText='预约姓名' myPlaceholder='请输入您的姓名' ref='ref1' inputHaveSlot='true'>
		<template slot='mySlot'>
			<view class="slectSex">
				<text class='gril'>女士</text>
				<text class='boy'>先生</text>
			</view>
		</template>
	</myList>
</view>
<view class="listBox">
	<myList @getTextAreaValue='getTextAreaValue' labelText='预约电话' modelTitleAlign='center' type='textarea' myPlaceholder='请输入您的电话'
	 ref='ref2'></myList>
</view>
